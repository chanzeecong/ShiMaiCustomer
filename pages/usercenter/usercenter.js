// pages/usercenter/usercenter.js
const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask: '',
    maskState: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.initPageData();
  },

  async onDailySign () {
    let message = await this.getUserInfo();

    console.log(message.is_sign)

    if (message.is_sign == '1') {
      wx.showToast({
        title: '今日已签到,无法重复签到',
        icon: 'none'
      })
    } else {
			let status = await this.getDailySign();
      this.setData({
        showMask: 'show',
        maskState: 'in'
      })
    }
  },

  closeDailyMask() {
    this.setData({
      showMask: '',
      maskState: ''
    })
  },

  getUserCollection() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}userCollection`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          console.log(res)
          resolve(res.data.data)
        }
      })
    })
  },

  getFollowList() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}followings`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
          console.log(res.data.data)
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

  async initPageData() {
    let collect = await this.getUserCollection();
    let userInfo = await this.getUserInfo();
    let follow = await this.getFollowList();

    this.setData({
      userInfo: userInfo,
      collect: collect.length,
      follow: follow.length,
    })
  },

  getDailySign() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}payerSignIn`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          console.log(res)
          resolve(res.data.data)
        }
      })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})