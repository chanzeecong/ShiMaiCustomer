// pages/search_list/search_list.js
const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let search_word = options.search_word;
		let data = {};
		data.search_word = search_word;
		let searchRes = this.startToRequest(data); 

		this.setData({
			search_word: options.search_word
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

	startToRequest(data) {
		let _this = this;

		return new Promise((resolve, rejected) => {
			wx.showLoading({
				title: '正在搜索中',
			})
			wx.request({
				url: `${app.hostName}essayList`,
				data: data,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${app.token}`
				},
				dataType: 'json',
				responseType: 'text',
				success: function (res) {
					wx.hideLoading();
					res.flag = true;
					resolve(res);

					let showList = res.data.data;

					_this.setData({
						showList: showList
					})
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
	}
})