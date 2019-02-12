// pages/myscore/myscore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 500,
    myscore: [
      { 'title': '签到成功', 'score': 5, 'type': 'up', 'time': '2018-12-12' },
      { 'title': '活动扣除', 'score': 5, 'type': 'down', 'time': '2018-12-13' },
      { 'title': '签到成功', 'score': 5, 'type': 'up', 'time': '2018-12-14' },
      { 'title': '活动扣除', 'score': 5, 'type': 'down', 'time': '2018-12-15' }
    ]
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

  }
})