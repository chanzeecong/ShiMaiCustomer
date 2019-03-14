// pages/buyer_detail/buyer_detail.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
        id: 0,
        label: `文章`
      },
      {
        id: 1,
        label: `商品`
      },
    ],
    currentTab: 0,
    buyer_id: ``,
    buyerDetail: {},
    is_followed: false,
    isCollected: false,
    buyerCollected: 3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let buyer_id = options.id;
    
    this.setData({
      buyer_id: buyer_id
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

  onTapClick(e) {
    let currentTab = Number(e.currentTarget.dataset.index);
    console.log(currentTab);
    this.setData({
      currentTab: currentTab
    })
  },

	onFollowBtnClick(e) {
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
					for (let i in this.data.buyerDetail.buyer) {
						if (this.data.buyer_id == this.data.buyerDetail.buyer[i].buyer_id) {
							this.data.buyerDetail.buyer[i].is_followed = 1;
						}
					}

					this.setData({
						buyerDetail: this.data.buyerDetail
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
					for (let i in this.data.buyerDetail.buyer) {
						if (this.data.buyer_id == this.data.buyerDetail.buyer[i].buyer_id) {
							this.data.buyerDetail.buyer[i].is_followed = 0;
						}
					}

					this.setData({
						buyerDetail: this.data.buyerDetail
					})

					wx.showToast({
						title: '取消关注成功！',
					})
					resolve(res.data.data);
				}
			})
		})
	},

	// 小星星收藏
	handleCollection() {
		console.log(this.data)

		return new Promise(resolve => {
			wx.request({
				url: `${app.hostName}clickCollection`,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${app.token}`
				},
				data: {
					collection_id: this.data.buyer_id,
					collection: this.data.buyerCollected,
				},
				dataType: 'json',
				success: (res) => {
					for (let i in this.data.buyerDetail.buyer) {
						if (this.data.buyer_id == this.data.buyerDetail.buyer[i].buyer_id) {
							this.data.buyerDetail.buyer[i].is_collect = 1;
						}
					}

					this.setData({
						buyerDetail: this.data.buyerDetail
					})

					wx.showToast({
						title: '收藏文章成功！',
					})
					resolve(res.data.data);
				}
			})
		})

	},

	// 小星星收藏
	UnhandleCollection() {
		return new Promise(resolve => {
			wx.request({
				url: `${app.hostName}cancelCollection`,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${app.token}`
				},
				data: {
					collection_id: this.data.buyer_id,
					collection: this.data.buyerCollected,
				},
				dataType: 'json',
				success: (res) => {
					for (let i in this.data.buyerDetail.buyer) {
						if (this.data.buyer_id == this.data.buyerDetail.buyer[i].buyer_id) {
							this.data.buyerDetail.buyer[i].is_collect = 2;
						}
					}

					this.setData({
						buyerDetail: this.data.buyerDetail
					})

					wx.showToast({
						title: '取消收藏成功！',
					})
					resolve(res.data.data);
				}
			})
		})
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

  async initPageData() {
    let buyerDetail = await this.getbuyerDetail();
    console.log(buyerDetail);

    this.setData({
      buyerDetail: buyerDetail,
    })
  },

  getbuyerDetail() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}buyer/${this.data.buyer_id}`,
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
  }
})