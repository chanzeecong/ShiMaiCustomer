const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0,
    expressDetail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.id
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

    let orderDetail = await this.getOrderDetail();
    let expressDetail = await this.getExpressDetail(orderDetail.post_id);
    console.log(expressDetail)

    this.setData({
      orderDetail: orderDetail,
      expressDetail: expressDetail
    })
  },

  getOrderDetail() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}order/${this.data.orderId}`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data)
        }
      })
    })
  },

  getExpressDetail(id) {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}order/${this.data.orderId}/express`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data)
        }
      })
    })
  },

  onCopyBtnClick() {
    wx.setClipboardData({
      data: this.data.orderDetail.id_card_no,
      success(res) {
        console.log(res);
        wx.showToast({
          title: '复制成功',
          icon: `none`
        })
      }
    })
  },
})