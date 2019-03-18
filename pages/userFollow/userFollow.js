// pages/userFollow/userFollow.js
const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followList: []
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
    this.initPageData()
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

	async initPageData() {
		let followList = await this.getFollowList();
		console.log(followList)

		this.setData({
			followList: followList,
		})
	},

	getFollowList() {
		return new Promise(resolve => {
			wx.request({
				url: `${app.hostName}followings`,
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

		wx.request({
			url: `${app.hostName}buyer/${e.currentTarget.dataset.id}/follow`,
			method: 'POST',
			header: {
				'Authorization': `Bearer ${app.token}`
			},
			dataType: 'json',
			success: (res) => {
				for (let i in this.data.followList) {
					if (buyerId == this.data.followList[i].id) {
						this.data.followList[i].is_followed = true;
					}
				}

				this.setData({
					followList: this.data.followList
				})

				wx.showToast({
					title: '关注买手成功！',
				})
			}
		})
	},

	onUnfollowBtnClick(e) {
		let buyerId = e.currentTarget.dataset.id;

		wx.request({
			url: `${app.hostName}buyer/${e.currentTarget.dataset.id}/unFollow`,
			method: 'DELETE',
			header: {
				'Authorization': `Bearer ${app.token}`
			},
			dataType: 'json',
			success: (res) => {
				for (let i in this.data.followList) {
					if (buyerId == this.data.followList[i].id) {
						this.data.followList[i].is_followed = false;
					}
				}

				this.setData({
					followList: this.data.followList
				})

				wx.showToast({
					title: '取消关注成功！',
				})
			}
		})
	},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})