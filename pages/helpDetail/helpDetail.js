const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
const WxParse = require('../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ``,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)

    this.setData({
      id: Number(options.id)
    })
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
    this.getHelpDetail();
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

  getHelpDetail() {
    wx.request({
      url: `${app.hostName}help/${this.data.id}`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${app.token}`
      },
      dataType: 'json',
      success: (res) => {
        let article = res.data.data.content;
        WxParse.wxParse('article', 'html', article, this);
      }
    })
  }
})