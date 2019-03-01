// pages/userCollect/userCollect.js
const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        id: 1,
        label: `商品`
      },
      {
        id: 2,
        label: `文章`
      },
      {
        id: 3,
        label: `买手`
      }
    ],
    currentTab: 0,
    borderTab: [0, 3],
    scrollToLeft: 0,
    collectList:[]
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

  async onTapClick(e) {
    // console.log(e);
    let currentTab = Number(e.currentTarget.dataset.index);
    let leftTab = this.data.borderTab[0];
    let rightTab = this.data.borderTab[1];
    let borderTab = this.data.borderTab;
    let scrollToLeft = this.data.scrollToLeft;

    if (borderTab[0] >= currentTab) {

      leftTab = (borderTab[0] <= 0) ? 0 : leftTab - (borderTab[0] - currentTab + 1);
      rightTab = (borderTab[0] <= 0) ? 3 : rightTab - (borderTab[0] - currentTab + 1);

      scrollToLeft -= app.globalData.width / 2 * (borderTab[0] + 1);
      scrollToLeft = (scrollToLeft <= 0) ? 0 : scrollToLeft;

    } else if (borderTab[1] <= currentTab) {

      leftTab = (borderTab[1] >= 5) ? 2 : leftTab + (currentTab - borderTab[1] + 1);
      rightTab = (borderTab[1] >= 5) ? 5 : rightTab + (currentTab - borderTab[1] + 1);

      scrollToLeft += app.globalData.width / 2 * (currentTab - borderTab[1] + 1);
      scrollToLeft = (scrollToLeft >= app.globalData.width) ? app.globalData.width : scrollToLeft;
    }

    // let status = this.data.tabList[currentTab].id;
    let collectList = await this.getCollectList();
    console.log(collectList)

    if (collectList === undefined) {
      collectList = [];
    }

    console.log(currentTab);

    this.setData({
      currentTab: currentTab,
      scrollToLeft: scrollToLeft,
      borderTab: [leftTab, rightTab],
      collectList: collectList
    })
  },
  
  
  async initPageData() {
    console.log(this.data.tabList);
    console.log(this.data.currentTab);
    // let status = this.data.tabList[this.data.currentTab].id
    // console.log(status);

    let collectList = await this.getCollectList();
    this.setData({
      collectList: collectList,
    })
  },

  getCollectList() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}userCollection`,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})