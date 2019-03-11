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
    detailList: [],
    currentPage: 1, //当前页
    isScroll: true,
    indicatorDots: true,
    circular: true,
    scrollHeight: 0,
    topNum: 0,
    acticeCollected: 2,
    followBuyer: 3,
    is_followed: false,
    isCollected: false,
    isLike: false,
    showModalStatus: false,
    amount: 1, //初始数量
    gg_id: ``,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    let type = options.type;
    let buyer_id = options.buyer_id
    console.log(id)
    console.log(type)
    console.log(buyer_id)
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
          let is_followed = !this.data.is_followed;
          this.setData({
            is_followed
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
          let is_followed = !this.data.is_followed;
          this.setData({
            is_followed
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
          collection_id: this.data.id,
          collection: this.data.acticeCollected,
        },
        dataType: 'json',
        success: (res) => {
          let isCollected = !this.data.isCollected;
          this.setData({
            isCollected
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
        url: `${app.hostName}clickCollection`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          collection_id: this.data.id,
          collection: this.data.acticeCollected,
        },
        dataType: 'json',
        success: (res) => {
          let isCollected = !this.data.isCollected;
          this.setData({
            isCollected
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
  Likebtn() {
    let isLike = !this.data.isLike;
    let num = this.data.id;
    this.setData({
      isLike
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
    console.log(detailList);

    this.setData({
      detailList: detailList,
    });

    this.setCountDown();
  },


  setCountDown() {
    for (let i in this.data.detailList) {
      let endDate = this.data.detailList[i].end_time;

      if (!endDate) {
        continue;
      }
      let arr = endDate.split(` `);
      let arr0 = arr[0].split(`-`);
      let arr1 = arr[1].split(`:`);

      this.countDown(Number(arr0[0]), Number(arr0[1]) - 1, Number(arr0[2]), Number(arr1[0]), Number(arr1[1]), Number(arr1[2]), Number(i))
    }
  },

  countDown(yy, MM, dd, hh, mm, ss, index) {
    let date = new Date(yy, MM, dd, hh, mm, ss);

    let deadlineTime = date.getTime();
    let nowDate = new Date();
    let nowTime = nowDate.getTime();
    let distTime = deadlineTime - nowTime;

    if (distTime > 0) {
      let day = Math.floor(distTime / 1000 / 3600 / 24);
      let hour = Math.floor(distTime / 1000 / 3600 % 24);
      let minute = Math.floor(distTime / 1000 / 60 % 60);
      let second = Math.floor(distTime / 1000 % 60);

      day = (day <= 9) ? `0${day}` : day;
      hour = (hour <= 9) ? `0${hour}` : hour;
      minute = (minute <= 9) ? `0${minute}` : minute;
      second = (second <= 9) ? `0${second}` : second;

      this.data.detailList[index].countDownDay = day;
      this.data.detailList[index].countDownHour = hour;
      this.data.detailList[index].countDownMin = minute;
      this.data.detailList[index].countDownSec = second;

      this.setData({
        detailList: this.data.detailList
      })

      setTimeout(() => {
        this.countDown(yy, MM, dd, hh, mm, ss, index);
      }, 1000);
    } else {
      this.data.detailList[index].countDownDay = 0;
      this.data.detailList[index].countDownHour = 0;
      this.data.detailList[index].countDownMin = 0;
      this.data.detailList[index].countDownSec = 0;
    }
  },

  buyGoods() {
    this.showModal();
  },

  showModal() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  filter: function(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let gg_id = e.currentTarget.dataset.gg;

    for (let i in this.data.detailList) {

      if (id === this.data.detailList[i].id) {

        for (let j in this.data.detailList[i].good_attributes) {

          this.data.detailList[i].good_attributes[j].isChoose = false;
        }
        this.data.detailList[i].good_attributes[index].isChoose = true;
      }
    }

    this.setData({
      detailList: this.data.detailList,
      gg_id: gg_id
    })
  },

  confirm_buy(e) {
    let good_attr_id = this.data.gg_id;
    this.setData({
      good_attr_id: good_attr_id
    })
    let index = e.currentTarget.dataset.index;
    let home = this.data.detailList[index];
    let sizeList = home.good_attributes;
    let isChoose = false;
    let attrId = 0;

    for (let size of sizeList) {
      if (size.isChoose) {
        isChoose = true;
        attrId = size.id;
        break;
      }
    }
    if (isChoose) {
      return new Promise(resolve => {
        wx.request({
          url: `${app.hostName}order`,
          method: 'POST',
          header: {
            'Authorization': `Bearer ${app.token}`
          },
          data: {
            good_attr_id: this.data.good_attr_id,
            amount: this.data.amount.toString(),
          },
          dataType: 'json',
          success: (res) => {
            resolve(res.data.data);
            wx.navigateTo({
              url: `../confirmOrder/confirmOrder?attrId=${attrId}`,
            })
          }
        })
      })
      
    } else {
      wx.showToast({
        title: '你不选买个锤子',
        icon: `none`
      })
    }
  },


  /* 点击减号 */
  bindMinus: function() {
    let detailList = this.data.detailList;

    let amount = Math.max(this.data.amount - 1, 1);

    this.setData({
      detailList: detailList,
      amount: amount
    })
  },
  /* 点击加号 */
  bindPlus: function() {
    let detailList = this.data.detailList;
    let amount = Math.min(this.data.amount + 1, 9)

    this.setData({
      detailList: detailList,
      amount: amount
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

  }
})