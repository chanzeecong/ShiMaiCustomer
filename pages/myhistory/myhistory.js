// pages/myhistory/myhistory.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAll: false,
    manageActive: false,
    currentPage: 1,
    scrollHeight: 0,
    activeCheckBox: ``,
    goodList: [],
    hasMoreData: true,
    foot_id: ``,
    is_recommend: 1,
    pageSize: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          scrollHeight: res.windowHeight
        })
      }
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
    let goodList = await this.goodList();

    console.log(goodList);

    this.setData({
      goodList: goodList,
    });
  },

  goodList(page = '') {
    var that = this;
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}getFootPrintList`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          page: this.data.currentPage,
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
          var list = res.data.data;
          if (res.data.data.length < this.data.pageSize) {
            wx.showToast({
              icon: "none",
              title: '没有更多数据'
            });
            that.setData({
              hasMoreData: false
            })
          } else {
            that.setData({
              goodList: that.data.goodList.concat(list),
              hasMoreData: true,
              currentPage: that.data.currentPage + 1
            })
          }
          wx.hideLoading();
        }
      })
    })
  },
  toggleManage() {
    let activeClass = '';
    let activeFlag = this.data.manageActive;
    activeFlag = !activeFlag;
    if (activeFlag) {
      activeClass = 'active';
    } else {
      activeClass = '';
    }

    this.setData({
      manageActive: activeFlag,
      activeCheckBox: activeClass
    })
  },

  listSelection(e) {

  },

  selectAll(e) {
    // console.log(e);
    let selectAll = e.detail.value[0];
    let allList = this.data.goodList;
    if (selectAll) {
      allList.forEach(item => {
        item.checked = 'true'
      })

      this.setData({
        goodList: allList
      })
    } else {
      allList.forEach(item => {
        item.checked = ''
      })
      this.setData({
        goodList: allList
      })
    }
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

  },
  loadMore() {
    if (this.data.hasMoreData) {
      this.goodList()
      wx.showLoading({
        title: '在加载啦',
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '都没有了你还想咋地'
      })
    }
  },
})