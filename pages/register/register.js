const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneTip: ``,
    msgTip: ``,
    phoneNum: ``,
    msgCode: ``,
    msgKey: ``,
    getCode: 'true',
    canSignIn: 'true',
    countDown: 180,
    isSendMsg: false,
    isWaiting: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.distributorId);

    if (app.distributorId === 0) {
      this.checkUserLogin(); 
    } else {
      this.startRegist();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '正在进入识买',
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  async startRegist(){
    let code = await this.getCode();
    let token = await this.userLogin(code);
    app.token = token;
//    app.uploadToken = await this.getUploadToken();
    
    this.setData({
      isWaiting: false
    })

    wx.hideLoading();
  },

  onPhoneNumInput(e) {
    let reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    let phoneNumber = e.detail.value;
    let getCode = this.data.getCode;
    (reg.test(phoneNumber)) ? getCode = '' : getCode = 'true'
    this.setData({
      getCode: getCode,
      phoneNum: phoneNumber
    })
  },

  onDeletePhoneBtnClick() {
    this.setData({
      phoneNum: ``
    })
  },

  confirm_agreement(e){
    console.log(e.detail.value);
    let checked = e.detail.value;
    let canSignIn = 'true';
    if (checked.length > 0){
      canSignIn = ''
    }else{
      canSignIn = 'true'
    }
    // canSignIn = '';
    this.setData({
      canSignIn: canSignIn
    })
  },

  onMsgInput(e) {
    this.setData({
      msgCode: e.detail.value,
      msgTip: ``
    })
  },
  async onGetCodeBtnClick() {
    let phoneNum = this.data.phoneNum;
    let phoneTip = ``;
    let msgKey = ``;
    

    if (!phoneNum) {
      phoneTip = `手机号不能为空`

      this.setData({
        phoneTip: phoneTip,
        msgKey: msgKey
      })

      return false;
    }

    let msgData = await this.getMsgCode();
    console.log(msgData);

    if (msgData.errors) {
      phoneTip = msgData.errors.phone[0];
    } else {
      msgKey = msgData.key;
      
    }

    this.setData({
      phoneTip: phoneTip,
      msgKey: msgKey
    })

    if (msgData.errors) {
      return
    }

    this.setData({
      isSendMsg: true,
    })

    let time = this.data.countDown;
    let timeout = setInterval(() => {
      time--;
      this.setData({
        countDown: time
      })

      if (time <= 0) {
        clearInterval(timeout);
        this.setData({
          countDown: 60,
          isSendMsg: false,
        })
      }
    }, 1000);
  },

  getMsgCode() {
    return new Promise((resolve, rejected) => {
      wx.request({
        url: `${app.hostName}verificationCodes`,
        method: 'POST',
        data: {
          phone: this.data.phoneNum
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data);
          console.log('success', res);
        },
        fail(res){
          console.log('fail', res);
          rejected('fail');
        }
      })
    })
  },

  async onRegisterBtnClick(e) {
    let nickName = e.detail.userInfo.nickName;
    let avatarUrl = e.detail.userInfo.avatarUrl;
    let isRegister = this.verificationInput();
    
    if (!isRegister) {
      return;
    }

    let code = await this.getCode();
    let registerResult = await this.userRegister(code, nickName, avatarUrl);

    console.log('registerResult',registerResult)
    if (!registerResult.access_token) {
      wx.showToast({
        title: registerResult.verification_key[0],
        icon: `none`
      })
      return
    }
    else{
      wx.switchTab({
        url: '../discover/discover',
      })
    }

    app.token = registerResult.access_token;
//    app.uploadToken = await this.getUploadToken();
    
    wx.setStorageSync(`phoneNum`, this.data.phoneNum);

    setTimeout(function(){
      wx.showLoading({
        title: '注册成功',
      })
    },800)    
  },

  userRegister(code, nickName, avatarUrl) {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}customer`,
        method: 'POST',
        data: {
          verification_key: this.data.msgKey,
          verification_code: this.data.msgCode,
          code: code,
          nickName: nickName,
          avatarUrl: avatarUrl,
          inviting_distributor_id: app.distributorId,
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data);
        }
      })
    })
  },

  verificationInput() {
    let phoneTip = ``;
    let msgTip = ``;
    let isRegister = true;

    if (!this.data.phoneNum) {
      phoneTip = `手机号不能为空`;
      isRegister = false;
    }

    if (!this.data.msgCode) {
      msgTip = `验证码不能为空`;
      isRegister = false;
    }

    this.setData({
      phoneTip: phoneTip,
      msgTip: msgTip,
    })

    return isRegister;
  },

  async checkUserLogin() {
    let code = await this.getCode();
    let token = await this.userLogin(code);
    console.log(token)

    if (token) {

      app.token = token;
 //     app.uploadToken = await this.getUploadToken();

      wx.switchTab({
        url: '../discover/discover',
        })

    }
     else {
      wx.hideLoading();

      this.setData({
        isWaiting: false
      })
    }

    console.log(code)
  },

  getCode() {
    return new Promise(resolve => {
      wx.login({
        success(res) {
          resolve(res.code)
        },
      })
    })
  },

  userLogin(code) {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}authorizations`,
        method: 'POST',
        data: {
          code: code
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.access_token);
        }
      })
    })
  },

/*  getUploadToken() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}authorizations`,
        method: 'POST',
        header: {
          'authorizations': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          console.log(res)
          resolve(res.data.data)
        }
      })
    })
  }*/
})