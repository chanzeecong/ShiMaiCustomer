const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0,
    defaultAddr: {},
    addrList: [],
    currentAddr: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log (options)
    
    let isCustom = 1;
    let currentAddr = 0;

    if (undefined === options.isCustom || `` === options.isCustom) {
      isCustom = 0;
    }

    if (undefined === options.currentAddr || `` === options.currentAddr){
      currentAddr = 0;
    }else{
      currentAddr = options.currentAddr;
    }
    this.setData ({
      orderId: Number(options.order_id),
      attrId: Number(options.attrId),
      isCustom: isCustom,
      currentAddr: Number(currentAddr)
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

  onAddAddrBtnClick () {
    wx.navigateTo({
      url: '../editAddr/editAddr?id=0',
    })
  },

  async initPageData() {
    let addrList = await this.getAddrList();
    console.log('addrList', addrList);
    let defaultAddr = {
      id: ``
    };
    console.log(addrList)

    for (let addr of addrList) {
      if (addr.is_default) {
        defaultAddr = addr;
        break;
      }
    }
    
    console.log(defaultAddr)

    this.setData({
      addrList: addrList,
      defaultAddr: defaultAddr
    })
  },

  getAddrList() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}address`,
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

  onChooseOrderAddrBtnClick (e) {
    console.log()
    if (!this.data.orderId && !this.data.attrId) {
      return;
    }

    console.log(`this.data.orderId`, this.data.orderId);
    // console.log(`this.data.attrId`, this.data.attrId);
    console.log(e.currentTarget.dataset.id);
    console.log(app.isCustom)
    console.log (this.data.isCustom)
    if (this.data.isCustom) {
      // console.log(e);
      wx.redirectTo({
        url: `../customConfirmOrderDetail/customConfirmOrderDetail?order_id=${this.data.orderId}&addrId=${e.currentTarget.dataset.id}`,
      })
    } else {
      console.log(this.data.attrId)
      wx.redirectTo({
        url: `../confirmOrder/confirmOrder?attrId=${this.data.attrId}&addrId=${e.currentTarget.dataset.id}`,
      })
    }
    
    
    
  }
})