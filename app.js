//app.js
const regeneratorRuntime = require('lib/runtime.js');
const qiniuUploader = require("lib/qiniuUploader.js");

App({
  onLaunch: function () {
    this.getMobileDemision();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  async chooseImage(imgcount, sourceType) {

    imgcount = imgcount || 1;

    let imageArr = await this.wxChooseImage(imgcount, sourceType);
    wx.showLoading({
      title: '图片加载中',
    })
    let imgList = [];
    if (imageArr.length) {

      for (let item of imageArr) {
        let url = await this.uploadImg(item)
        imgList.push(url)
      }
    }
    wx.hideLoading();

    return imgList;

  },

  wxChooseImage(imgcount, sourceType) {
    imgcount = imgcount || 1;

    if (sourceType) {
      return new Promise(resovle => {
        wx.chooseImage({
          count: imgcount,
          sourceType: [sourceType],
          success(res) {
            console.log(res)
            resovle(res.tempFilePaths);
          }
        })
      })
    } else {
      return new Promise(resovle => {
        wx.chooseImage({
          count: imgcount,
          success(res) {
            console.log(res)
            resovle(res.tempFilePaths);
          }
        })
      })
    }
  },

  uploadImg(tempUrl) {
    return new Promise(resolve => {
      qiniuUploader.upload(tempUrl, (res) => {

        resolve(res.imageURL)
      }, (error) => {
        console.log('error' + error)
      }, {
          region: 'SCN',
          domain: 'https://buyer.sm.afxclub.top',
          uptoken: this.uploadToken,
        });
    })
  },


  hostName: `https://customer.afxclub.top/api/`,
  token: '',
  distributorId: 0,
  globalData: {
    width: 375,
    windowHeiht: 555,
    height: 667,
    userInfo: null,
  },
  getMobileDemision() {
    wx.getSystemInfo({
      success: (res) => {
        let width = res.screenWidth;
        let height = res.screenHeight;

        this.globalData.width = width;
        this.globalData.height = height;
        this.globalData.windowWidth = res.windowWidth;
        let model = res.model;
        console.log(width)
      }
    })
  },

  userLogin(code) {
    return new Promise(resolve => {
      wx.request({
        url: `${this.hostName}authorizations`,
        method: 'POST',
        data: {
          token: code
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.access_token);
          console.log(token)
        }
      })
    })
  }
})