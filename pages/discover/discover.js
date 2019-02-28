// pages/discover/discover.js
// pages/discover/discover.js
const regeneratorRuntime = require('../../lib/runtime.js');
const touches = require('../../lib/touchScroll.js');
const app = getApp();
Page({

  /**
  * 页面的初始数据
  */
  data: {
    top: 0,
    scrollToLeft: 0,
    topNum: 0,
    borderTab: [0, 4],
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
    currentTab: 0,
    productionCount: 1,
    height: app.globalData.windowHeight * 0.77,
    isShowAllTab: false,
    isScroll: true,
    isShowMask: false,
    isShowLesson: false,
    showList: [],
    homeList: [],
    eassyList: [],
    temporaryList: {},
    imgList: [],
    isShowImg: false,
    searchContent: ``,
    currentImgIndex: 0,
    userInfo: {},
    nextTab: '',
    page: 1,
  },

  scrollTabStart(e) {
    touches.touchStart(e);
  },

  scrollTabEnd(e) {

    let scrollDirection = touches.touchEnd(e);
    let current = this.data.currentTab;

    if (current >= 0 && scrollDirection === 1) {
      let nextTab = current + 1;
      (this.data.tabList.length - 1 < nextTab) ? nextTab = this.data.tabList.length - 1 : nextTab
      // console.log(nextTab);
      this.setData({
        currentTab: nextTab,
        nextTab: `tab-${nextTab}`,
      })
      this.showListFn(nextTab)
      // console.log('current tab', current);
      // console.log('next tab', nextTab);
    } else if (current > 0 && scrollDirection === 2) {
      // console.log('preview tab')
      let nextTab = current - 1;
      this.setData({
        currentTab: nextTab,
        nextTab: `tab-${nextTab}`,
      })
      this.showListFn(nextTab)
    }
  },

  onTabClick(e) {
    // console.log(e);
    if (typeof (e.target.dataset.index) === 'undefined') {
      return false;
    }
    let currentTab = Number(e.target.dataset.index);
    let currentId = Number(e.target.dataset.id);
    let leftTab = this.data.borderTab[0];
    let rightTab = this.data.borderTab[1];
    let borderTab = this.data.borderTab;
    let scrollToLeft = this.data.scrollToLeft;
    let tabLen = this.data.tabList.length;
    let showTabCount = 5;


    if (borderTab[0] >= currentTab) {

      leftTab = Math.max(currentTab - 1, 0);
      rightTab = leftTab + (showTabCount - 1);
      scrollToLeft = app.globalData.width / 2.6 * leftTab;

    } else if (borderTab[1] <= currentTab) {

      rightTab = Math.min(currentTab + 1, tabLen);
      leftTab = rightTab - (showTabCount - 1);
      scrollToLeft = app.globalData.width / 2.6 * (rightTab - (showTabCount - 1));
    }

    this.setData({
      currentTab: currentTab,
      scrollToLeft: scrollToLeft,
      borderTab: [leftTab, rightTab],
      isShowAllTab: false,
      isScroll: true,
      isShowMask: false,
    })

    this.showListFn(currentTab);
  },


  async showListFn(currentId) {
    let showList = [];
    showList = await this.getEssay(currentId);
    this.setData({
      showList: showList
    })
  },

  scrollTopFun(e) {
    let that = this;
    that.top = e.detail.scrollTop;
    that.$apply();
  },

  onPageScroll(e) {
    // console.log(e)
    if (e.scrollTop > 300) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop(e) { 
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
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
  getEssay(tag = 0, page = 1, key = ' ') {
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
