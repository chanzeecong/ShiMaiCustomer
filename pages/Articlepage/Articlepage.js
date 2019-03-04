// pages/Articlepage/Articlepage.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ``,
    type: ``,
    detailList: [],
    currentPage: 1, //当前页
    isScroll: true,
    indicatorDots: true,
    circular: true,
    duration: 1000,
    scrollHeight: 0,
    topNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    let type = options.type;
    let buyer_id = options.buyer_id
    console.log(id)
    console.log(type)
    this.setData({
      id,
      type,
    })
    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          scrollHeight:res.windowHeight
        })
      }
    })
  },

  scrolltoupper(e) {
    // console.log(e);
    if(e.detail.scrollTop > 300) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      })
    }
  },

  //回到顶部
  goTop (e) {  // 一键回到顶部
    this.setData({
      topNum: this.data.topNum = 0,
      duration: 3000
    });
  },

  getDetail(type = '', id = '', page = '', ) {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}getEssayListById`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          type: this.data.type,
          id: this.data.id,
          page: this.data.currentPage,
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
        }
      })
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
    this.initPageData();
  },
  async initPageData() {
    let detailList = await this.getDetail();
    console.log(detailList);
    console.log(detailList[0].buyer_id)

    this.setData({
      detailList: detailList,
    });
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

  }
})