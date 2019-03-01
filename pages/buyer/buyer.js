// pages/buyer/buyer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'buyer_id_1',
    hotList: [
      { id: 'b_1', name: 'Jane', area: '法国', badge: ['法国代购', '香水', '包'], state: true, img: 'https://buyer.sm.afxclub.top/4.png' },
      { id: 'b_2', name: 'Jane2', area: '美国', badge: ['美国代购', '香水', '包'], state: true, img: 'https://buyer.sm.afxclub.top/4.png' },
      { id: 'b_3', name: 'Jane3', area: '英国', badge: ['英国代购', '香水', '包'], state: true, img: 'https://buyer.sm.afxclub.top/4.png' },
      { id: 'b_4', name: 'Jane4', area: '日本', badge: ['日本代购', '香水', '包'], state: true, img: 'https://buyer.sm.afxclub.top/4.png' },
    ],
    areaList: [
      { id: '1', area: 'Japan', img: 'https://buyer.sm.afxclub.top/banner-test.png' },
      { id: '2', area: 'Korea', img: 'https://buyer.sm.afxclub.top/bannar_Korea01@2x.png' },
      { id: '3', area: 'America', img: 'https://buyer.sm.afxclub.top/banner-test.png' },
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

  scroll(e){
    // console.log(e.detail.scrollLeft);
  },

  toUpper(e) {
    //滑动到最左边
    console.log(`toUpper`, e)
  },

  toLower(e){
    //滑动到最右边
    console.log(`toLower`, e)
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