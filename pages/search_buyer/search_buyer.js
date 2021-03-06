const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');
var WxSearch = require('../wxSearchView/wxSearchView.js');

Page({

  data: {
    show: '',
    array: [{
        name: 'buyer',
        value: '买手',
        icon: 'https://buyer.sm.afxclub.top/icon_buyer_white@2x.png',
        checked: 'true'
      },
      {
        name: 'tag',
        value: '标签',
        icon: 'https://buyer.sm.afxclub.top/icon_bianqian_white@2x.png'
      },
      {
        name: 'area',
        value: '地区',
        icon: 'https://buyer.sm.afxclub.top/icon_area_white@2x.png'
      }
    ],
    checkedValue: '买手',
		type: 1,
    Hotkeys: []
  },

  onLoad: function(options) {
			this.setData({
					status: options.entrance
			})

    // 2 搜索栏初始化
    var that = this;
    WxSearch.init(
      that, // 本页面一个引用
			[], // 热点搜索推荐，[]表示不使用
			[],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput, // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap, // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm, // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear, // 清空函数

  // 4 搜索回调函数  
  mySearchFunction: function(value) {
		let type = this.data.type;
		let status = this.data.status;
    // do your job here
		if(status == 2)
		{
			if (type == 1) {
				wx.redirectTo({
					url: '../search_buyerList/search_buyerList?type=1&search_word=' + value
				})
			}
			else if (type == 2) {
				wx.redirectTo({
					url: '../search_buyerList/search_buyerList?type=2&search_word=' + value
				})
			}
			else {
				wx.redirectTo({
					url: '../search_buyerList/search_buyerList?type=3&search_word=' + value
				})
			}	
		}
		else{
			wx.redirectTo({
				url: '../search_list/search_list?search_word=' + value
			})
		}
  },

  // 5 返回回调函数
  myGobackFunction: function() {
    // do your job here
    // 示例：返回
    wx.navigateBack({
      delta: 1
    })
  },

  showSelection(e) {
    let showClass = 'show';
    let flag = this.data.flag;

    if (!flag) {
      this.setData({
        show: showClass,
        flag: true
      })
    } else {
      this.setData({
        show: '',
        flag: false
      })
    }
  },
  radioChange(e) {
    let value = e.detail.value;
    let name = '';
		let type = 1;

    switch (value) {
      case 'buyer':
        name = '买手';
				type = 1;
        break;
      case 'tag':
        name = '标签';
				type = 2;
        break;
      case 'area':
        name = '地区';
				type = 3;
        break;
    }
    this.setData({
      checkedValue: name,
			type: type
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
    this.initDataPage();
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

	async initDataPage() {
		let hotKeys = await this.getUserHistory();

		this.setData({
			hotKeys: hotKeys
		})
	},

	getUserHistory() {
		return new Promise(resolve => {
			wx.request({
				url: `${app.hostName}getUserHistory`,
				method: 'GET',
				header: {
					'Authorization': `Bearer ${app.token}`
				},
				dataType: 'json',
				success: (res) => {
					console.log(res)
					resolve(res.data.data)
				}
			})
		})
	}
})