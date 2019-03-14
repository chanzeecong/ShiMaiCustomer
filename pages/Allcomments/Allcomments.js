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
    commentList: {},
    content: ``,
    reply_content: ``,
    user_content: ``,
    parent_id: ``,
    to_uid: ``,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    // console.log(id)
    this.setData({
      id
    })
    this.getComments();
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

  // 评论
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
          let newList = res.data.data;
          this.setData({
            commentList: this.data.commentList.concat(newList),
            content: ``,
          })
        }
      })
    })
  },

  // 回复层主的品论
  bindTextReply(e) {
    // console.log(e);
    this.setData({
      reply_content: e.detail.value
    })
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}essay/${this.data.id}/comment`,
        method: 'POST',
        data: {
          content: this.data.reply_content,
          parent_id: this.data.parent_id
        },
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success:(res) => {
          resolve(res.data.data);
          this.setData({
            reply_content: ``
          })
        }
      })
    })
  },
  
  // 回复拿到的id
  reply_comment(e) {
    console.log(e.currentTarget.dataset.idx);
    let parent_id = e.currentTarget.dataset.idx;
    this.setData({
      parent_id: parent_id
    })
  },

  // 灰色部分回复的id
  to_user(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.iidx);
    let to_uid = e.currentTarget.dataset.iidx;
    this.setData({
      to_uid: to_uid,
    })
  },

  // bindTextuser(e) {
  //   console.log(e);
  //   this.setData({
  //     user_content: e.detail.value
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
})