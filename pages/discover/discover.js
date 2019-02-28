// pages/discover/discover.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
  * 页面的初始数据
  */
  data: {
    selectionActive: '',
    scrollID: '',
    tabList: [
      {
        id: -1,
        label: `推荐`,
        src: `../../image/icon_recommendation@2x.png`
      },
      {
        id: -2,
        label: `关注`,
        src: `../../image/icon_attention@2x.png`
      },
      {
        id: 1,
        label: `母婴`,
        src: `../../image/icon_Baby-Products@2x.png`
      },
      {
        id: 2,
        label: `鞋包`,
        src: `../../image/icon_Shoe-bag@2x.png`
      },
      {
        id: 3,
        label: `家居`,
        src: `../../image/icon_household-products@2x.png`
      },
      {
        id: 4,
        label: `生活`,
        src: `../../image/icon_life@2x.png`
      },
      {
        id: 5,
        label: `家电`,
        src: `../../image/icon_Home-appliance@2x.png`
      },
      {
        id: 6,
        label: `美妆`,
        src: `../../image/icon_makeups@2x.png`
      },
      {
        id: 7,
        label: `护肤`,
        src: `../../image/icon_Skin-care@2x.png`
      },
    ],
    scrollLeft: 0,
    isShowAllTab: false,
    isScroll: true,
    showList: [],
    eassyList: [],
    isShowMask: false,
    searchContent: ``,
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

  async initPageData() {
    let tagsList = await this.getTags();
    let eassay = await this.getEssay();
    console.log(tagsList);
    console.log(eassay);

    this.setData({
      tabList: tagsList,
      eassyList: eassay,
    });
  },
  
  onShowTabBtnClick() {
    this.setData({
      isShowAllTab: !this.data.isShowAllTab,
      isScroll: this.data.isShowAllTab,
      isShowMask: !this.data.isShowAllTab
    })
  },
  // 获取标签
  getTags() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}tag`,
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

  onSearchInput(e) {
    let searchContent = e.detail.value;

    this.setData({
      searchContent: searchContent
    })
  },

  // 数据请求
  getEssay(tag = 0, page = 1, key=' ') {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}essayList`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          tag: tag,
          page: 1,
          search_word: key
        },
        contentType: `application/x-www-form-urlencoded`,
        dataType: `json`,
        success: (res) => {
          resolve(res.data.data);
        }
      })
    })
  },
  showAllSelections() {
    let activeClass = 'active';
    this.setData({
      selectionActive: activeClass
    })
  },

  hideSelectionClass() {
    this.setData({
      selectionActive: ''
    })
  },

  chooseItem(e) {
    let idx = e.currentTarget.dataset.index;
    console.log(idx);
    let cateList = this.data.cate;
    let scroll_id = `item_${idx}`;

    cateList.forEach((item, i) => {
      cateList[i].active = '';
    })

    cateList[idx].active = 'active';
    this.setData({
      cate: cateList,
      scrollID: scroll_id,
      selectionActive: ''
    })
  },

  chooseCategory(e) {
    // console.log(e.target);
    let currentIdx = e.target.dataset.index;
    let offsetLeft = e.target.offsetLeft;
    let cateList = this.data.cate;
    let left = offsetLeft - 60;
    (left < 0) ? left = 0 : '';

    cateList.forEach((item, i) => {
      if (i === currentIdx) {
        cateList[i].active = 'active';
      } else {
        cateList[i].active = '';
      }
    })

    this.setData({
      cate: cateList,
      scrollLeft: left
    })
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

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }
})
