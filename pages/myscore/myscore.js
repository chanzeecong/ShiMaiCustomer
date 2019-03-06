// pages/myscore/myscore.js
const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    myscore: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.initPageData();
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

  async initPageData() {
    let score = await this.getScoreDetail();
    console.log(score);

    this.setData({
      score: score
    })
  },

  getScoreDetail() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}getScoreDetail`,
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
})