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
    currentPage: 1, //当前页
    pageSize: 2, // 每页条数
    hasMoreData: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    var that = this;
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}getAllCountryBuyers`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          page: this.data.currentPage
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
          var list = res.data.data;
          if (list.length < this.data.pageSize) {
            wx.showToast({
              icon: "none",
              title: '没有更多数据'
            });
          } else {
            that.setData({
              countryList: that.data.countryList.concat(list),
              hasMoreData: true,
              currentPage: that.data.currentPage + 1,
            })
          }
          wx.hideLoading();
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

	onFollowBtnClick(e) {
		let buyerId = e.currentTarget.dataset.id;
		console.log(buyerId)

		wx.request({
			url: `${app.hostName}buyer/${e.currentTarget.dataset.id}/follow`,
			method: 'POST',
			header: {
				'Authorization': `Bearer ${app.token}`
			},
			dataType: 'json',
			success: (res) => {
				for (let i in this.data.hotList) {
					if (buyerId == this.data.hotList[i].id) {
						this.data.hotList[i].is_follow = true;
					}
				}

				this.setData({
					hotList: this.data.hotList
				})
				
				wx.showToast({
					title: '关注买手成功！',
				})
			}
		})
	},

	onUnfollowBtnClick(e) {
		let buyerId = e.currentTarget.dataset.id;
		console.log(e.currentTarget.dataset.id)

		wx.request({
			url: `${app.hostName}buyer/${e.currentTarget.dataset.id}/unFollow`,
			method: 'DELETE',
			header: {
				'Authorization': `Bearer ${app.token}`
			},
			dataType: 'json',
			success: (res) => {
				for (let i in this.data.hotList) {
					if (buyerId == this.data.hotList[i].id) {
						this.data.hotList[i].is_follow = false;
					}
				}

				this.setData({
					hotList: this.data.hotList
				})

				wx.showToast({
					title: '取消关注成功！',
				})
			}
		})
	},

  loadMore() {
    if (this.data.hasMoreData) {
      this.getCountry()
      wx.showLoading({
        title: '在加载啦',
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '都没有了你还想咋地'
      })
    }
  }
})