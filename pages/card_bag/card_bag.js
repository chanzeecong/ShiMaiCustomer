// pages/card_bag/card_bag.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        id: 0,
        label: `全部`
      },
      {
        id: 1,
        label: `未使用`
      },
      {
        id: 2,
        label: `已使用`
      },
      {
        id: 3,
        label: `已过期`
      }
    ],
    currentTab: 0,
    borderTab: [0, 3],
    scrollToLeft: 0,
    couponList: [],
    showData:  [
        { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'useful' },
        { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'disabled' },
        { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'used' }
    ],
    allData: [],
    useful: [],
    disabled: [],
    used: []
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

  async spitAllData(){
    let status = this.data.tabList[currentTab].id;
    console.log(status)
    let allData = await this.getCoupon(status);
    console.log(allData)
    /*let allData = [
      { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'useful' },
      { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'disabled' },
      { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'disabled' }
    ];*/
    // console.log(this.isString(allData) === '[object Array]');
    let useFul = [];
    let disabled = [];
    let used = [];

    if (this.isString(allData)==='[object Array]'){
      allData.forEach(item => {
        switch (item.status) {
          case 'useful':
            useFul.push(item);
            break;
          case 'disabled':
            disabled.push(item);
            break;
          case 'used':
            used.push(item);
            break;
          default:
            break;
        }
      })

      this.setData({
        allData: allData,
        useful: useFul,
        disabled: disabled,
        used: used
      })
    }
  },

  isString(data){
    return Object.prototype.toString.call(data);
  },

  chooseTab(e){
    let tabIndex = e.target.dataset.status || this.data.currentTab.toString();
    // console.log(tabIndex)
    let currentTab = this.data.currentTab.toString();
    let clearArray = ['', '', '', ''];
    clearArray[tabIndex] = 'active';

    let allData = this.data.allData;
    let useFul = this.data.useful;
    let disabled = this.data.disabled;
    let used = this.data.used;
    let showDataArray = this.data.showData;

    if ( currentTab !== tabIndex ) {
      switch (tabIndex) {
        case '1':
          showDataArray = useFul;
          // console.log('未使用')
        break;
        case '2':
          showDataArray = used;
          // console.log('已使用');
        break;
        case '3':
          showDataArray = disabled;
          // console.log('已过期')
        break;
        default:
          showDataArray = allData;
          // console.log('全部')
        break;
      }
    }

    this.setData({
      tabActive: clearArray,
      currentTab: tabIndex,
      showData: showDataArray
    })
    // console.log(this.data.currentTab)
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

    let status = this.data.tabList[currentTab].id;
    let couponList = await this.getCoupon(status);
    console.log(couponList)

    if (couponList === undefined) {
      couponList = [];
    }

    this.setData({
      currentTab: currentTab,
      scrollToLeft: scrollToLeft,
      borderTab: [leftTab, rightTab],
      couponList: couponList
    })
  },

  async initPageData() {
    let status = this.data.tabList[this.data.currentTab].id;
    let couponList = await this.getCoupon(status);
    console.log(couponList);

    this.setData({
      couponList: couponList
    })
  },

  getCoupon(status) {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}coupon`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data:{
          status: status
        },
        dataType: `json`,
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