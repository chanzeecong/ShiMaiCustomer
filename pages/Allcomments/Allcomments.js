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
    parent_id: ``,
    newList: ``,
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
  showInputBox: function() {
    this.setData({
      inputBoxShow: true
    });
    this.setData({
      isScroll: false
    });
  },
  invisible: function() {
    this.setData({
      inputBoxShow: false
    });
    this.setData({
      isScroll: true
    });
  },

  async initPageData() {
    let newList = await this.bindTextAreaBlur();
    this.setData({
      newList: commentList,
      commentList: commentList,
    });
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
    console.log('1111111:', e.detail.value)
    bindblur = e.detail.value;

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
          let newList = res.data.data
          this.setData({
            commentList: this.data.commentList.concat(newList),
          })
          wx.showToast({
            title: '评论成功！',
          })
        }
      })
    })
  },

  reply_comment(e) {
    console.log(e.currentTarget.dataset.idx);
    this.setData({
      parent_id: e.currentTarget.dataset.idx
    })

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
    this.initPageData()
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