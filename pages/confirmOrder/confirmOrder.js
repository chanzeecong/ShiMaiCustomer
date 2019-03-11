const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attrId: 0,
    addrId: 0,
    userInfo: {},
    id: 0,
    defaultAddr: {
      region: ``,
    },
    goodDetail: {},
    amount:1,
    totalPrice: 0,
    comment: ``
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData ({
      attrId: Number(options.attrId),
      addrId: Number (options.addrId),
      id: Number(options.id),
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
  
  onCutCountBtnClick() {
    let goodDetail = this.data.goodDetail;

    let amount = Math.max(this.data.amount - 1, 1);

    let totalPrice = (goodDetail.price * amount) + Number(goodDetail.transportation_costs) + Number(goodDetail.tax_fee);

    totalPrice = totalPrice.toFixed(2)

    this.setData({
      goodDetail: goodDetail,
      totalPrice: totalPrice,
      amount: amount
    })
  },
  onAddCountBtnClick() {
    let goodDetail = this.data.goodDetail;
    let amount = Math.min(this.data.amount + 1, 9)

    let totalPrice = (goodDetail.price * amount) + Number(goodDetail.transportation_costs) + Number(goodDetail.tax_fee);

    totalPrice = totalPrice.toFixed(2)

    this.setData({
      goodDetail: goodDetail,
      totalPrice: totalPrice,
      amount: amount
    })
  },

  onOrderAmounctInput(e) {
    let goodDetail = this.data.goodDetail;
    let amount = Number(e.detail.value);

    if (`` === amount || NaN === amount) {
      this.setData({
        amount: 1
      })
    } else {

      amount = Math.min(amount, 9)
      amount = Math.max(amount, 1)

      let totalPrice = (goodDetail.price * amount) + Number(goodDetail.transportation_costs) + Number(goodDetail.tax_fee) ;

      totalPrice = totalPrice.toFixed(2)

      this.setData({
        goodDetail: goodDetail,
        totalPrice: totalPrice,
        amount: amount
      })
    }

  },

  onPaidBtnClick() {
    let goodDetail = this.data.goodDetail;

    if (!this.data.defaultAddr) {
      wx.showToast({
        title: '请选择收货地址',
        icon: `none`
      })
      return;
    }

    wx.showLoading({
      title: '',
    })

    new Promise(resolve => {
      wx.request({
        url: `${app.hostName}order/${goodDetail.id}/payment`,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          address_id: this.data.defaultAddr.id.toString(),
          good_attr_id: this.data.attrId.toString(),
          amount: this.data.amount.toString(),
          comment: this.data.comment
         },
        dataType: 'json',
        success: (res) => {
          resolve(res.data);
        }
      })
    }).then(data => {
      console.log(data)
      wx.hideLoading()

      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: (res) => {
          wx.navigateTo({
            url: `../payResult/payResult?result=1&id=${goodDetail.id}`,
          })
        },
        fail: (res) => {
          wx.navigateTo({
            url: `../payResult/payResult?result=0&id=${goodDetail.id}`,
          })
        }
      })
    })

  },

  async initPageData() {
    wx.showLoading({
      title: '订单信息加载中',
    })

    let userInfo = await this.getUserInfo();
    let defaultAddr = ``;

    if (this.data.addrId) {
      defaultAddr = await this.getAddrDetail ();
      
    } else {
      let addrList = await this.getAddrList();

      for (let addr of addrList) {
        console.log(addr.is_default)
        if (addr.is_default) {
          defaultAddr = addr;
          break;
        }
      }
    }
    console.log(defaultAddr)

    let goodDetail = await this.getGoodDetail ();
    let totalPrice = (goodDetail.price * this.data.amount) + Number(goodDetail.transportation_costs) + Number(goodDetail.tax_fee);

    totalPrice = totalPrice.toFixed(2)
    wx.hideLoading();
    this.setData({
      userInfo: userInfo,
      defaultAddr: defaultAddr,
      goodDetail: goodDetail,
      totalPrice: totalPrice,
      addrId: defaultAddr.id
    })
  },

  getUserInfo() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}distributor`,
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
  getAddrDetail() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}address/${this.data.addrId}`,
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
  getGoodDetail() {
    return new Promise(resolve => {
      wx.request({
        // url: `${app.hostName}customerOrder`,
        url: `${app.hostName}confirmOrder`,

        method: 'POST',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          good_attr_id: this.data.attrId
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
        }
      })
    })
  },
  onCommentInput (e) {
    this.setData ({
      comment: e.detail.value
    })
  }
})