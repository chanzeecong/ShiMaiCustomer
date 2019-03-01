// pages/buyer_detail/buyer_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    badge: ['法国代购', '香水', '包'],
    active: ['active', ''],
    showList: 
    {
      type: 'article',
      list:[
        { id: '1', img: 'https://buyer.sm.afxclub.top/text-img.png', title: '一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有', price: '99', tag: '识买精选', time: '2018-10-26', comments: '15621' },
        { id: '2', img: 'https://buyer.sm.afxclub.top/text-img.png', title: '一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有', price: '99', tag: '识买精选', time: '2018-10-26', comments: '15621' }
      ]
    },
    list:
      {
        article: [
          { id: '1', img: 'https://buyer.sm.afxclub.top/text-img.png', title: '一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有', number: '9', time: '2018-10-26'},
          { id: '2', img: 'https://buyer.sm.afxclub.top/text-img.png', title: '一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有', number: '9', time: '2018-10-26' }
        ],
        product: [
          { id: '1', img: 'https://buyer.sm.afxclub.top/text-img.png', title: '一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有', price: '99', tag: '识买精选', time: '2018-10-26', comments: '15621' },
          { id: '1', img: 'https://buyer.sm.afxclub.top/text-img.png', title: '一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有', price: '99', tag: '识买精选', time: '2018-10-26', comments: '15621' }
        ]
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

  changeTab(e){
    // console.log(e.target.dataset);
    let idx = Number(e.target.dataset.idx);
    let flag = e.target.dataset.type;
    let list = this.data.list;
    let obj = {};
    obj.type = flag;
    obj.list = list[flag];

    switch (idx){
      case 0:
        this.setData({
          active: ['active', ''],
          showList: obj
        })
      break;
      case 1:
        this.setData({
          active: ['', 'active'],
          showList: obj
        })
      break;
      default:
      break;
    }
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