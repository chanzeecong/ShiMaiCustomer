// pages/userCollect/userCollect.js
const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        id: 1,
        label: `商品`
      },
      {
        id: 2,
        label: `文章`
      },
      {
        id: 3,
        label: `买手`
      }
    ],
    currentTab: 0,
    borderTab: [0, 3],
    scrollToLeft: 0,
    collectList:[],
    is_on_sale: '',
    isShow: false,
    isShowMask: false,

    sortItems: [
      { id: '', value: '全部', checked: 'true'},
      { id: 1, value: '显示有货' },
      { id: 0, value: '已下架' }
    ],
    articleItems:[
      { id: '', value: '全部', checked: 'true' },
      { id: 1, value: '视频' },
      { id: 0, value: '图文' },
    ],
		show: '',
		array: [{
			name: 'buyer',
			value: '分享',
			checked: 'true'
		},
		{
			name: 'tag',
			value: '取消收藏'
		},
		{
			name: 'area',
			value: '取消'
		}
		],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  async onTapClick(e) {
    let currentTab = Number(e.currentTarget.dataset.index);
    let leftTab = this.data.borderTab[0];
    let rightTab = this.data.borderTab[1];
    let borderTab = this.data.borderTab;
    let scrollToLeft = this.data.scrollToLeft;

    if (borderTab[0] >= currentTab) {

      leftTab = (borderTab[0] <= 0) ? 0 : leftTab - (borderTab[0] - currentTab + 1);
      rightTab = (borderTab[0] <= 0) ? 3 : rightTab - (borderTab[0] - currentTab + 1);

      scrollToLeft -= app.globalData.width / 2 * (borderTab[0] + 1);
      scrollToLeft = (scrollToLeft <= 0) ? 0 : scrollToLeft;

    } else if (borderTab[1] <= currentTab) {

      leftTab = (borderTab[1] >= 5) ? 2 : leftTab + (currentTab - borderTab[1] + 1);
      rightTab = (borderTab[1] >= 5) ? 5 : rightTab + (currentTab - borderTab[1] + 1);

      scrollToLeft += app.globalData.width / 2 * (currentTab - borderTab[1] + 1);
      scrollToLeft = (scrollToLeft >= app.globalData.width) ? app.globalData.width : scrollToLeft;
    }

    let status = this.data.tabList[currentTab].id;
    let is_on_sale = '';

    if (status == 1) {
      for (let i in this.data.sortItems) {
        if (is_on_sale == this.data.sortItems[i].id) {
          let changeSort = this.data.sortItems[i].value;

          this.setData({
            changeSort: changeSort
          })

          break;
        }
      }
    }
    else if (status == 2) {
      for (let i in this.data.articleItems) {
        if (is_on_sale == this.data.articleItems[i].id) {
          let changeArticle = this.data.articleItems[i].value;

          this.setData({
            changeArticle: changeArticle
          })

          break;
        }
      }
    }

    console.log(status)
    let collectList = await this.getCollectList(status, is_on_sale);
    console.log(collectList)

    if (collectList === undefined) {
      collectList = [];
    }

    this.setData({
      currentTab: currentTab,
      scrollToLeft: scrollToLeft,
      borderTab: [leftTab, rightTab],
      collectList: collectList
    })
  },

  showSort() {
    this.setData({
      sortActive: 'active',
      sortActiveState: 'in',
      wrapperHeight: `${app.windowHeight}px`
    })
  },

  hideSort() {
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

  async sortChange(e) {
    console.log(e);
    let is_on_sale = e.detail.value;
    let status = this.data.tabList[this.data.currentTab].id;
    let collectList = await this.getCollectList(status, is_on_sale);
    console.log(collectList)

    if (collectList === undefined) {
      collectList = [];
    }

    this.setData({
      collectList: collectList
    })

    if(status == 1)
    {
      for (let i in this.data.sortItems) {
        if (e.detail.value == this.data.sortItems[i].id) {
          let changeSort = this.data.sortItems[i].value;

          this.setData({
            changeSort: changeSort
          })

          break;
        }
      }
    }
    else if(status == 2)
    {
      for (let i in this.data.articleItems) {
        if (e.detail.value == this.data.articleItems[i].id) {
          let changeArticle = this.data.articleItems[i].value;

          this.setData({
            changeArticle: changeArticle
          })

          break;
        }
      }
    }

    this.hideSort();
  },

  onEditBtnClick(){

    this.setData({
      isShow:true
    })
  },

  onCancelBtnClick() {

    this.setData({
      isShow: false
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
					for (let i in this.data.collectList) {
						if (id == this.data.collectList[i].id) {
							this.data.collectList[i].is_zan = 1;
							this.data.collectList[i].like_amount++;
						}
					}

					this.setData({
						collectList: this.data.collectList
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
					for (let i in this.data.collectList) {
						if (id == this.data.collectList[i].id) {
							this.data.collectList[i].is_zan = 2;
							this.data.collectList[i].like_amount--;
						}
					}

					this.setData({
						collectList: this.data.collectList
					})

					wx.showToast({
						title: '取消点赞成功！',
					})
				}
			})
		})
	},
  
	showSelection(e) {
		let id = e.currentTarget.dataset.id;
		console.log(id)
		let showClass = 'show';
		let flag = this.data.flag;

		for(let i in this.data.collectList)
		{
			if(id == this.data.collectList[i].id)
			{
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
			}
		}
	},
	radioChange(e) {
		let value = e.detail.value;
		let name = '';
		let type = 1;

		switch (value) {
			case 'buyer':
				name = '分享';
				type = 1;
				break;
			case 'tag':
				name = '取消收藏';
				type = 2;
				break;
			case 'area':
				name = '取消';
				type = 3;
				break;
		}
		this.setData({
			type: type
		})
	},

  async initPageData() {
    let status = this.data.tabList[this.data.currentTab].id;
    let is_on_sale = '';
    let collectList = await this.getCollectList(status, is_on_sale);

    this.setData({
      collectList: collectList,
    })
  },

  getCollectList(status, is_on_sale) {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}userCollection`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data:{
          type: status,
          is_on_sale: is_on_sale
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
        }
      })
    })
  }
})