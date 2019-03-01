//app.js
App({
  onLaunch: function () {
    this.getMobileScreen();
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

  hostName: `https://customer.afxclub.top/api/`,
  token: '',
  distributorId: 0,
  globalData: {
    width: 375,
    windowHeiht: 555,
    height: 667,
    userInfo: null,
  },
  getMobileScreen(){
    let _this = this;
    wx.getSystemInfo({
      success: (res) => {
        let width = res.screenWidth;
        let height = res.screenHeight;

        this.globalData.width = width;
        this.globalData.height = height;
        this.globalData.windowWidth = res.windowWidth;
        console.log(res.windowWidth);
      }
    })
  },

  // hostName: `http://distributor.shimai.com/api/`,
  hostName: `https://customer.afxclub.top/api/`,
  token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdXN0b21lci5hZnhjbHViLnRvcFwvYXBpXC9jdXN0b21lciIsImlhdCI6MTU1MTIzMzIyMCwiZXhwIjoxNTUzODI1MjIwLCJuYmYiOjE1NTEyMzMyMjAsImp0aSI6IjZnZDRtWk4xVUVMeGUza0ciLCJzdWIiOjYzLCJwcnYiOiJjZTM5YTYwNmNiZTcwNDIwNTRhM2Y1MzYxNGY4ZjIwMjk5ZmQ5YWFlIn0.EXgaxbXZ-JMehR6NrWKoqvekIxpZn8Bf4FGLARHlks4`,
  scanPath: '',
  orderId: 0,
  distributorId: 0,
  isCustom: 0,
  globalData: {
    width: 375,
    windowWidth: 555,
    height: 667,
    userInfo: null,
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