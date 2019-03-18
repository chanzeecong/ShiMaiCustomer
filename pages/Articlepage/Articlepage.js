// pages/Articlepage/Articlepage.js
const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ``,
    type: ``,
    buyer_id: ``,
    detailList: {},
    currentPage: 1, //当前页
    isScroll: true,
    indicatorDots: true,
    circular: true,
    scrollHeight: 0,
    topNum: 0,
    followBuyer: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    let type = options.type;
    let buyer_id = options.buyer_id

    this.setData({
      id,
      type,
      buyer_id,
    })

    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
  },

  scrolltoupper(e) {
    // console.log(e);
    if (e.detail.scrollTop > 300) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      })
    }
  },

  //回到顶部
  goTop(e) {
    this.setData({
      topNum: this.data.topNum = 0,
    });
  },

  getDetail(type = '', id = '', page = '', ) {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}getEssayListById`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          type: this.data.type,
          id: this.data.id,
          page: this.data.currentPage,
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
        }
      })
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
					for (let i in this.data.detailList) {
						if (this.data.buyer_id == this.data.detailList[i].buyer_id) {
							this.data.detailList[i].is_follow = true;
						}
					}

					this.setData({
						detailList: this.data.detailList
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
					for (let i in this.data.detailList) {
						if (this.data.buyer_id == this.data.detailList[i].buyer_id) {
							this.data.detailList[i].is_follow = false;
						}
					}

					this.setData({
						detailList: this.data.detailList
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
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}clickCollection`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
					buyer_id: this.data.buyer_id,
          collection_id: this.data.id,
					collection: this.data.type,
        },
        dataType: 'json',
        success: (res) => {
					for (let i in this.data.detailList) {
						if (this.data.id == this.data.detailList[i].id) {
							this.data.detailList[i].is_collect = 1;
						}
					}

					this.setData({
						detailList: this.data.detailList
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
					buyer_id: this.data.buyer_id,
          collection_id: this.data.id,
					collection: this.data.type,
        },
        dataType: 'json',
        success: (res) => {
					for (let i in this.data.detailList) {
						if (this.data.id == this.data.detailList[i].id) {
							this.data.detailList[i].is_collect = 2;
						}
					}

					this.setData({
						detailList: this.data.detailList
					})
				 
          wx.showToast({
            title: '取消收藏成功！',
          })
          resolve(res.data.data);
        }
      })
    })
  },

  // 点赞功能
  getLikeBtn() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}clickZan`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          buyer_id: this.data.buyer_id,
					type: this.data.type,
          id: this.data.id,
        },
        dataType: 'json',
        success: (res) => {
					for (let i in this.data.detailList) {
						if (this.data.id == this.data.detailList[i].id) {
							this.data.detailList[i].is_zan = 1;
							this.data.detailList[i].like_amount++;
						}
					}

					this.setData({
						detailList: this.data.detailList
					})

          wx.showToast({
            title: '点赞成功！',
          })
        }
      })
    })
  },

	getUnLikeBtn() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}cancelZan`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          buyer_id: this.data.buyer_id,
					type: this.data.type,
          id: this.data.id,
        },
        dataType: 'json',
        success: (res) => {
					for (let i in this.data.detailList) {
						if (this.data.id == this.data.detailList[i].id) {
							this.data.detailList[i].is_zan = 2;
							this.data.detailList[i].like_amount--;
						}
					}

					this.setData({
						detailList: this.data.detailList
					})

          wx.showToast({
            title: '取消点赞成功！',
          })
        }
      })
    })
  },

  // 保存足迹
  saveFootList() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}saveFootPrintList`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          id: this.data.id,
          type: this.data.type,
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
        }
      })
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
    this.saveFootList();
  },
	
  async initPageData() {
    let detailList = await this.getDetail();
		let comment = await this.getComment();
    console.log(detailList);

    this.setData({
      detailList: detailList,
			comment: comment
    });
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

	getComment() {
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
  onShareAppMessage: function() {

  }
})