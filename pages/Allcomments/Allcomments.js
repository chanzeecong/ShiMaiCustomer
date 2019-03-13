// pages/Allcomments/Allcomments.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ``,
    isScroll: true,
    inputBoxShow: false,
    isScroll: true,
    commentList: [],
    content: ``,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    console.log(id)
    this.setData({
      id
    })
    this.getComments();
  },
  showInputBox: function () {
    this.setData({ inputBoxShow: true });
    this.setData({ isScroll: false });
  },
  invisible: function () {
    this.setData({ inputBoxShow: false });
    this.setData({ isScroll: true });
  },

  getComments() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}essay/${this.data.id}/comment`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
          console.log(res.data.data)
          let commentList = res.data.data;
          this.setData({
            commentList
          })
        }
      })
    })
  },

  bindTextAreaBlur(e) {
    console.log(e);
    this.setData({
      content: e.detail.value
    })
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}essay/${this.data.id}/comment`,
        method: 'POST',
        data: {
          content: this.data.content
        },
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
          console.log(res.data.data)
          let commentList = res.data.data;
          this.setData({
            commentList
          })
        }
      })
    })
  },
  
  reply_comment() {
    console.log(465465465)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})