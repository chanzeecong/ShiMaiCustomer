const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: 0,
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(Number(options.id))

    this.setData ({
      id: Number(options.id),
      result: Number (options.result)
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
    this.initPageData ();
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

  async initPageData () {

    if (this.data.id) {
      let orderDetail = await this.getOrderDetail ();
      console.log(orderDetail)
      this.setData ({
        orderDetail: orderDetail.order_data
      })
    }
  },

  getOrderDetail() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}customerOrder/${this.data.id}`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
        }
      })
    })
  },

  onOrderDetailBtnClick () {
    console.log(this.data.id)

    wx.navigateTo({
      url: `../orderDetail/orderDetail?id=${this.data.id}`,
    })
  },

  onConfirmOrderBtnClick () {
    wx.navigateBack({
      delta: 1
    })
  },

  backDiscover() {
    wx.switchTab({
      url: '../discover/discover',
    })
  }
})