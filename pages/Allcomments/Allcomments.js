// pages/Allcomments/Allcomments.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ``,
    isScroll: true,
    inputBoxShow: false,
    commentList: {},
    content: ``,
    parent_id: ``,
    to_uid: ``,
		status: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;

    this.setData({
      id
    })
  },
  

  // 评论
  bindTextAreaBlur(e) {
		let content = e.detail.value;

    this.setData({
      content: content
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

	onReplyBtn(e){
		let parent_id = e.currentTarget.dataset.id;
		let status = 1;

		for (let i in this.data.commentList)
		{
			if (parent_id == this.data.commentList[i].id)
				{
					let to_uid = this.data.commentList[i].from_uid;

					this.setData({
						status: status,
						parent_id: parent_id,
						to_uid: to_uid
					})

					break
				}
		}
	},

	onReplyBtnTo(e){
		let parent_reply_id = e.currentTarget.dataset.id;
		let status = 2;

		for (let i in this.data.commentList) {
			for(let a in this.data.commentList[i].reply)
				if (parent_reply_id == this.data.commentList[i].reply[a].id) {
					let parent_id = this.data.commentList[i].reply[a].parent_id;
					let to_uid = this.data.commentList[i].reply[a].from_uid;
					let name = this.data.commentList[i].reply[a].from_user_name;

					this.setData({
						status: status,
						parent_id: parent_id,
						to_uid: to_uid,
						name: name
					})

					break
			}
		}
	},

	onShowBtn(){
		let isShow = true;

		this.setData({
			isShow: isShow
		})
	},

	onSendReplyBtn(){
		console.log(this.data.content)
		console.log(this.data.parent_id)
		console.log(this.data.to_uid)

		if(!this.data.parent_id)
		{
			return new Promise(resolve => {
				wx.request({
					url: `${app.hostName}essay/${this.data.id}/comment`,
					method: 'POST',
					header: {
						'Authorization': `Bearer ${app.token}`
					},
					data: {
						content: this.data.content
					},
					dataType: 'json',
					success: (res) => {
						resolve(res.data.data);
						this.initPageData();
					}
				})
			})
		}
		else
		{
			return new Promise(resolve => {
				wx.request({
					url: `${app.hostName}essay/${this.data.id}/comment`,
					method: 'POST',
					header: {
						'Authorization': `Bearer ${app.token}`
					},
					data: {
						content: this.data.content,
						parent_id: this.data.parent_id,
						to_uid: this.data.to_uid
					},
					dataType: 'json',
					success: (res) => {
						resolve(res.data.data);
						this.initPageData();
					}
				})
			})
		}
	},

	async initPageData(){
		let comment = await this.getComments();
		let status = 0;
		console.log(comment)

		this.setData({
			commentList: comment
		})
	},

	getComments() {
		return new Promise(resolve => {
			wx.request({
				url: `${app.hostName}essay/${this.data.id}/comment`,
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

  },
})