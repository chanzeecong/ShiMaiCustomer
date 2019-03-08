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
    scrollHeight: 0,
    borderTab: [0, 4],
    selectionActive: '',
    tabList: [{
      id: -1,
      label: `推荐`,
      src: `https://buyer.sm.afxclub.top/icon_recommendation@2x.png`
    },
    {
      id: -2,
      label: `关注`,
      src: `https://buyer.sm.afxclub.top/icon_attention@2x.png`
    },
    {
      id: 1,
      label: `母婴`,
      src: `https://buyer.sm.afxclub.top/icon_Baby-Products@2x.png`
    },
    {
      id: 2,
      label: `鞋包`,
      src: `https://buyer.sm.afxclub.top/icon_Shoe-bag@2x.png`
    },
    {
      id: 3,
      label: `家居`,
      src: `https://buyer.sm.afxclub.top/icon_household-products@2x.png`
    },
    {
      id: 4,
      label: `生活`,
      src: `https://buyer.sm.afxclub.top/icon_life@2x.png`
    },
    {
      id: 5,
      label: `家电`,
      src: `https://buyer.sm.afxclub.top/icon_Home-appliance@2x.png`
    },
    {
      id: 6,
      label: `美妆`,
      src: `https://buyer.sm.afxclub.top/icon_makeups@2x.png`
    },
    {
      id: 7,
      label: `护肤`,
      src: `https://buyer.sm.afxclub.top/icon_Skin-care@2x.png`
    },
    ],
    currentTab: 0,
    productionCount: 1,
    isShowAllTab: false,
    isScroll: true,
    isShowMask: false,
    isShowLesson: false,
    showList: [],
    homeList: [],
    eassyList: [],
    temporaryList: {},
    searchContent: ``,
    tagsList: ``,
    userInfo: {},
    nextTab: '',
    currentPage: 1, //当前页
    pageSize: 2, // 每页条数
    hasMoreData: true,
    iscollected: false,
    job: [],
    jobList: [],
    id: '',
    jobStorage: [],
    jobId: ''
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

    console.log(currentTab)

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

  // scrollTopFun(e) {
  //   let that = this;
  //   that.top = e.detail.scrollTop;
  //   that.$apply();
  // },

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

  loadMore() {
    if (this.data.hasMoreData) {
      this.getEssay()
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPageData();
    var postId = options.id;
    console.log(postId);
  },
  async initPageData() {
    let tagsList = await this.getTags();
    let eassyList = await this.getEssay();
    console.log(tagsList);
    console.log(eassyList);
    this.setData({
      tagsList: tagsList,
      eassyList: eassyList,
    });
    
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  getEssay(tag = 0, page = '', key = ' ') {
    var that = this;
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}essayList`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          tag: tag,
          page: this.data.currentPage,
          search_word: key
        },
        contentType: `application/x-www-form-urlencoded`,
        dataType: `json`,
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
              eassyList: that.data.eassyList.concat(list),
              hasMoreData: true,
              currentPage: that.data.currentPage + 1
            })
          }
          wx.hideLoading();
        }
      })
    })
  },


  // 点击收藏
  onFollowBtnClick(e) {
    let index = e.currentTarget.dataset.index;
    let buyerId = this.data.homeList[index].buyer_id;
    console.log(this.data.homeList[index])

    wx.request({
      url: `${app.hostName}buyer/${this.data.homeList[index].buyer_id}/follow`,
      method: 'POST',
      header: {
        'Authorization': `Bearer ${app.token}`
      },
      dataType: 'json',
      success: (res) => {

        for (let i in this.data.showList) {
          if (buyerId === this.data.showList[i].buyer_id) {
            this.data.showList[i].is_followed = true;
          }
        }
        for (let i in this.data.homeList) {
          if (buyerId === this.data.homeList[i].buyer_id) {
            this.data.homeList[i].is_followed = true;
          }
        }
        this.setData({
          showList: this.data.showList,
          homeList: this.data.homeList,
        })
      }
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
  onReachBottom() {


  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})