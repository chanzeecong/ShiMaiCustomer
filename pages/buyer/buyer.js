// pages/buyer/buyer.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'buyer_id_1',
    hotList: [],
    countryList: [],
    isScroll: true,
    is_followed: false,
    buyer_id: ``,
    is_followed: ``,
    topNum: 0,
    scrollHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    wx.getSystemInfo({
      success: (res => {
        self.setData({
          scrollHeight: res.windowHeight
        })
      })
    })
  },


  scrolltoupper(e) {
    // console.log(e)
    if (e.detail.scrollTop > 300) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  goTop(e) {  // 一键回到顶部
    this.setData({
      topNum: this.data.topNum = 0
    });
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

  scroll(e) {
    // console.log(e.detail.scrollLeft);
  },

  toUpper(e) {
    //滑动到最左边
    console.log(`toUpper`, e)
  },

  toLower(e) {
    //滑动到最右边
    console.log(`toLower`, e)
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

  async initPageData() {
    let countryList = await this.getCountry();
    let hotList = await this.getRecommendBuyers();
    console.log(hotList)

    this.setData({
      countryList: countryList,
      hotList: hotList
    })
  },

  getCountry() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}getAllCountryBuyers`,
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

  getRecommendBuyers() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}getRecommendBuyers`,
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

  OnfollowBtnClick(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);

    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}buyer/${this.data.buyer_id}/follow`,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          id: this.data.buyer_id
        },
        dataType: 'json',
        success: (res) => {
          let is_followed = !this.data.is_followed;
          this.setData({
            is_followed
          })
          wx.showToast({
            title: '关注买手成功！',
          })
          resolve(res.data.data);
        }
      })
    })
  },


  onUnfollowBtnClick(e) {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}buyer/${this.data.buyer_id}/unFollow`,
        method: 'DELETE',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          let is_followed = 0;
          this.setData({
            is_followed
          })
          wx.showToast({
            title: '取消关注成功！',
          })
          resolve(res.data.data);
        }
      })
    })
  },

})