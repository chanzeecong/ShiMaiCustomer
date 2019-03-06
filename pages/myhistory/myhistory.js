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
    isShowMask: false,
    currentPage: 1,
    activeCheckBox: '',
    goodList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  listSelection(e) {},

  selectAll(e) {
    let selectAll = e.detail.value[0];
    let allList = this.data.showList;
    if (selectAll) {
      allList.forEach(item => {
        item.checked = 'true'
      })

      this.setData({
        showList: allList
      })
    } else {
      allList.forEach(item => {
        item.checked = ''
      })

      this.setData({
        showList: allList
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

  }
})