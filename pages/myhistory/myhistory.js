// pages/myhistory/myhistory.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAll: false,
    manageActive: false,
    currentPage: 1,
    scrollHeight: 0,
    activeCheckBox: ``,
    goodList: [],
		footprint: [
			{id: 6, type: 2}
		],
    hasMoreData: true,
    foot_id: ``,
    is_recommend: 1,
    pageSize: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          scrollHeight: res.windowHeight
        })
      }
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

  async initPageData() {
    let goodList = await this.goodList();

    console.log(goodList);

    this.setData({
      goodList: goodList,
    });
  },

  goodList(page = '') {
    var that = this;
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}getFootPrintList`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          page: this.data.currentPage,
        },
        dataType: 'json',
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
              goodList: that.data.goodList.concat(list),
              hasMoreData: true,
              currentPage: that.data.currentPage + 1
            })
          }
          wx.hideLoading();
        }
      })
    })
  },
  toggleManage() {
    let activeClass = '';
    let activeFlag = this.data.manageActive;
    activeFlag = !activeFlag;
    if (activeFlag) {
      activeClass = 'active';
    } else {
      activeClass = '';
    }

    this.setData({
      manageActive: activeFlag,
      activeCheckBox: activeClass
    })
  },



  selectAll(e) {
    let selectAll = e.detail.value[0];
		console.log(e.detail.value)
    let allList = this.data.goodList;

    if (selectAll) {
      allList.forEach(item => {
        item.checked = 'true'
      })

      this.setData({
        goodList: allList,
				is_all: 2
      })
    } else {
      allList.forEach(item => {
        item.checked = ''
      })
      this.setData({
        goodList: allList
      })
    }
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

	// 点赞功能
	getLikeBtn(e) {
		let buyer_id = e.currentTarget.dataset.buyerid;
		let type = e.currentTarget.dataset.type;
		let id = e.currentTarget.dataset.id;

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
					for (let i in this.data.goodList) {
						if (id == this.data.goodList[i].id) {
							this.data.goodList[i].is_zan = 1;
							this.data.goodList[i].like_amount++;
						}
					}

					this.setData({
						goodList: this.data.goodList
					})

					wx.showToast({
						title: '点赞成功！',
					})
				}
			})
		})
	},

	getUnLikeBtn(e) {
		let buyer_id = e.currentTarget.dataset.buyerid;
		let type = e.currentTarget.dataset.type;
		let id = e.currentTarget.dataset.id;

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
					for (let i in this.data.goodList) {
						if (id == this.data.goodList[i].id) {
							this.data.goodList[i].is_zan = 2;
							this.data.goodList[i].like_amount--;
						}
					}

					console.log(this.data.goodList)

					this.setData({
						goodList: this.data.goodList
					})

					wx.showToast({
						title: '取消点赞成功！',
					})
				}
			})
		})
	},

	listSelection(e) {
		let data = e.currentTarget.dataset
		console.log(data)

		for(let i in this.data.footprint)
		{
			if(data.id == this.data.footprint)
			{
				break;
			}
			else
			{
				this.data.footprint.push(data);

				console.log(this.data.footprint)

				this.setData({
					footprint: this.data.footprint,
					is_all: 1
				})

				break;
			}
		}
	},

	onDeleteBtnClick() {
		console.log(this.data.footprint)
		wx.request({
			url: `${app.hostName}delFootPrintList`,
			method: 'GET',
			header: {
				'Authorization': `Bearer ${app.token}`
			},
			data:{
				is_all: this.data.is_all,
				footprint: this.data.footprint
			},
			dataType: 'json',
			success: (res) => {
				this.initPageData();
			}
		})
	},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  loadMore() {
    if (this.data.hasMoreData) {
      this.goodList()
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
})