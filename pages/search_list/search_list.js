// pages/search_list/search_list.js
const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_word: ``,
    currentPage: 1,
    isScroll: true,
    scrollHeight: 0,
    pageSize: 5, // 每页条数
    hasMoreData: true,
    showList: ``,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let search_word = options.search_word;
    this.setData({
      search_word: search_word,
    });
    this.initPageData();
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          scrollHeight: res.windowHeight
        })
      }
    })

  },
  async initPageData() {
    let showList = await this.startToRequest();
    console.log(showList);
    this.setData({
      showList: showList
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  startToRequest() {
    var that = this;
    return new Promise((resolve, rejected) => {
      wx.showLoading({
        title: '正在搜索中',
      })
      wx.request({
        url: `${app.hostName}essayList`,
        data: {
          page: this.data.currentPage,
          search_word: this.data.search_word,
        },
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          wx.hideLoading();
          res.flag = true;
          resolve(res.data.data);
          var list = res.data.data;
          if (list.length < that.data.pageSize) {
            wx.showToast({
              icon: "none",
              title: '没有更多数据'
            });
          } else {
            that.setData({
              showList: that.data.showList.concat(list),
              hasMoreData: true,
              currentPage: that.data.currentPage + 1
            })
          }
          wx.hideLoading();
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '搜索失败',
          })
        },
        complete: function (res) {
          wx.hideLoading();
        },
      })
    })
  },

	// 点赞功能
	getLikeBtn(e) {
		let id = e.currentTarget.dataset.id;
		let buyer_id = e.currentTarget.dataset.buyerid;
		let type = e.currentTarget.dataset.type;

		return new Promise(resolve => {
			wx.request({
				url: `${app.hostName}clickZan`,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${app.token}`
				},
				data: {
					buyer_id: buyer_id,
					type: type,
					id: id,
				},
				dataType: 'json',
				success: (res) => {
					for (let i in this.data.showList) {
						if (id == this.data.showList[i].id) {
							this.data.showList[i].is_zan = 1;
							this.data.showList[i].like_amount++;
						}
					}

					this.setData({
						showList: this.data.showList
					})

					wx.showToast({
						title: '点赞成功！',
					})
				}
			})
		})
	},

	getUnLikeBtn(e) {
		let id = e.currentTarget.dataset.id;
		let buyer_id = e.currentTarget.dataset.buyerid;
		let type = e.currentTarget.dataset.type;

		return new Promise(resolve => {
			wx.request({
				url: `${app.hostName}cancelZan`,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${app.token}`
				},
				data: {
					buyer_id: buyer_id,
					type: type,
					id: id,
				},
				dataType: 'json',
				success: (res) => {
					for (let i in this.data.showList) {
						if (id == this.data.showList[i].id) {
							this.data.showList[i].is_zan = 2;
							this.data.showList[i].like_amount--;
						}
					}

					this.setData({
						showList: this.data.showList
					})

					wx.showToast({
						title: '取消点赞成功！',
					})
				}
			})
		})
	},

  loadMore() {
    if (this.data.hasMoreData) {
      this.startToRequest()
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