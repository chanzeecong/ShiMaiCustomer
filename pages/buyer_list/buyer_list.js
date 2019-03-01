// pages/buyer_list/buyer_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyerList: [
      { id: 'b_1', name: 'Jane', area: '法国', badge: ['法国代购', '香水', '包'], state: true, img: 'https://buyer.sm.afxclub.top/4.png' },
      { id: 'b_2', name: 'Jane2', area: '美国', badge: ['美国代购', '香水', '包'], state: true, img: 'https://buyer.sm.afxclub.top/4.png' },
      { id: 'b_3', name: 'Jane3', area: '英国', badge: ['英国代购', '香水', '包'], state: true, img: 'https://buyer.sm.afxclub.top/4.png' },
      { id: 'b_4', name: 'Jane4', area: '日本', badge: ['日本代购', '香水', '包'], state: true, img: 'https://buyer.sm.afxclub.top/4.png' },
    ]
  },


  onPageScroll(e) {
    // console.log(e)
    if (e.scrollTop > 300) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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