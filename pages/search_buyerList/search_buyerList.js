// pages/search_list/search_list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortActive: '',
    sortActiveState: '',
    sortItems: [
      { name: 'USA', value: '综合排序', checked: 'true' },
      { name: 'CHN', value: '按时间排序' },
      { name: 'BRA', value: '按热度排序' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {

      this.setData({
				search_word: options.search_word
      });
    }

		let search_word = options.search_word;
		let type = options.type;

		let data = {};
		data.search_word = search_word;
		data.type = type;
		let searchRes = this.startToRequest(data); 

    this.setData({
      innerHeight: `${app.windowHeight - 80}px`,
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

  showSort(){
    this.setData({
      sortActive: 'active',
      sortActiveState: 'in',
      wrapperHeight: `${app.windowHeight}px`
    })
  },
  hideSort(){
    let timeout;
    clearTimeout(timeout);

    this.setData({
      sortActive: 'active',
      sortActiveState: 'out'
    })

    timeout = setTimeout(() => {
      this.setData({
        sortActive: '',
        sortActiveState: '',
        wrapperHeight: `auto`
      })
    }, 500)
  },
  sortChange(e){
    console.log(e);
    this.hideSort();
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
				url: `${app.hostName}getAllCountryBuyers`,
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