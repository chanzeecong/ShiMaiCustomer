// pages/Modifydata/Modifydata.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ``,
    phone: ``,
    sex: ``,
    sign: ``,
    avatar: ``,
    sex: 0,
    radios: [
      {
        label: '男',
        value: '男',
      },
      {
        label: '女',
        value: '女',
      },
    ],
    isShowMask: false,
    isShowAvatarModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initPageData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  async initPageData() {
    let userInfo = await this.getUserInfo();

    this.setData({
      userInfo: userInfo,
    })
  },

  getUserInfo() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}customer`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  onAvatarBtnClick() {
    this.setData({
      isShowMask: true,
      isShowAvatarModal: true
    })
  },
  onCancelBtnClick() {
    this.setData({
      isShowMask: false,
      isShowAvatarModal: false
    })
  },

  // 修改头像
  async onPhotoBtnClick(e) {

    let type = e.currentTarget.dataset.type;
    let image = await app.chooseImage(1, type);

    new Promise(resolve => {
      wx.request({
        url: `${app.hostName}customer`,
        method: 'PUT',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          avatar: image[0]
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
        }
      })
    }).then(result => {
      let title = result ? `修改成功` : `修改失败`

      wx.showToast({
        title: title,
        icon: `none`
      });

      if (result) {
        this.data.userInfo.avatar = image[0];
      }

      this.setData({
        isShowMask: false,
        isShowAvatarModal: false,
        userInfo: this.data.userInfo,
        avatar: this.data.userInfo.avatar,
      });

    })
  },
  onNameInput(e) {
    let name = e.detail.value;
    console.log(name);

    this.setData({
      name: name
    })
  },

  onClearNameBtnClick() {
    this.setData({
      name: ``,
    })
  },

  onPhoneInput(e) {
    let phone = e.detail.value;

    this.setData({
      phone: phone
    })
  },

  onClearPhoneBtnClick() {
    this.setData({
      phone: ``,
    })
  },

  onSexInput(e) {
    let sex = e.detail.value;

    this.setData({
      sex: sex
    })
  },

  onClearSexBtnClick() {
    this.setData({
      sex: ``
    })
  },

  onSignInput(e) {
    let signature = e.detail.value;

    this.setData({
      signature: signature
    })
  },

  onClearSignBtnClick() {
    this.setData({
      signature: ``
    })
  },

  onConfirmBtnClick() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}customer`,
        method: 'PUT',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        data: {
          name: this.data.name,
          avatar: this.data.avatar,
          gender: this.data.sex,
          signature: this.data.signature
        },
        success: (res) => {
          resolve(res.data.data);
        }
      })
    }).then(result => {
      let title = result ? `保存成功！` : `输入内容呀`
      setTimeout(() => {
        wx.switchTab({
          url: '../usercenter/usercenter'
        })
      },800)
      wx.showToast({
        title: title,
        icon: `none`
      });
    })
  },
  check(e) {
    console.log(e)
    var that = this;
    var sex = e.currentTarget.dataset.index
    that.setData({
      sex: sex
    })
  },

})