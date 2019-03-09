const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: app.globalData.width,
    orderId: 0,
    orderDetail: {}
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

  onExpressBtnClick() {
    wx.navigateTo({
      url: `../expressDetail/expressDetail?id=${this.data.orderDetail.id}`,
    })
  },

  async initPageData() {

    let orderDetail = await this.getOrderDetail();

    console.log('orderDetail', orderDetail) // dddddddddddddddd

    this.setData({
      orderDetail: orderDetail
    })

   /* if (0 === orderDetail.status) {
      let date = orderDetail.created_at;
      let arr = date.split (` `);
      let arr0 = arr[0].split (`-`);
      let arr1 = arr[1].split (`:`);

      console.log(arr0[0], arr0[1], Number(arr0[2]) + 5, arr1[0], arr1[1], 0)

      this.countDown(arr0[0], arr0[1], Number(arr0[2]) + 5, arr1[0], arr1[1], 0);
    }*/
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

  /*countDown(yy, MM, dd, hh, mm, ss) {
    let date = new Date(yy, MM, dd, hh, mm, ss);

    let deadlineTime = date.getTime();
    let nowDate = new Date();
    let nowTime = nowDate.getTime();
    let distTime = deadlineTime - nowTime;

    if (distTime > 0) {
      let day = Math.floor(distTime / 1000 / 3600 / 24);
      let hour = Math.floor(distTime / 1000 / 3600 % 24);
      let minute = Math.floor(distTime / 1000 / 60 % 60);
      let second = Math.floor(distTime / 1000 % 60);

      day = (day <= 9) ? `0${day}` : day;
      hour = (hour <= 9) ? `0${hour}` : hour;
      minute = (minute <= 9) ? `0${minute}` : minute;
      second = (second <= 9) ? `0${second}` : second;

      this.data.orderDetail.countDownDay = day;
      this.data.orderDetail.countDownHour = hour;
      this.data.orderDetail.countDownMin = minute;
      this.data.orderDetail.countDownSec = second;

      this.setData({
        orderDetail: this.data.orderDetail
      })

      setTimeout(() => {
        this.countDown(yy, MM, dd, hh, mm, ss);
      }, 1000);
    } else {
      this.data.orderDetail.countDownDay = 0;
      this.data.orderDetail.countDownHour = 0;
      this.data.orderDetail.countDownMin = 0;
      this.data.orderDetail.countDownSec = 0;
    }
  },*/

  onPayBtnClick () {
    new Promise(resolve => {
      wx.request({
        url: `${app.hostName}order/${this.data.orderId}/payment`,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data)
        }
      })
    }).then (data => {
      console.log(data)

      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: (res) => {
          wx.navigateTo({
            url: `../payResult/payResult?result=1&id=${this.data.orderId}`,
          })
        },
        fail: (res) => {
          wx.navigateTo({
            url: `../payResult/payResult?result=0&id=0`,
          })
        }
      })
    })
  }
})