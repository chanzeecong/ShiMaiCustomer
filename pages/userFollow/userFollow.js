// pages/userFollow/userFollow.js
const app = getApp();
const regeneratorRuntime = require('../../lib/runtime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followList: [],
    buyer_id: ``,
    is_followed: false,
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
          console.log(res.data.data)
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

  // onUnfollowBtnClick(e) {
  //   wx.showModal({
  //     title: '是否取消关注？',
  //     showCancel: true,
  //     cancelText: "取消",
  //     cancelColor: 'black',
  //     confirmText: "确认",
  //     confirmColor: 'red',
  //     success: function(res) {
  //       if (res.cancel) {
  //         //点击取消,默认隐藏弹框
  //       } else {
  //         //点击确定
  //         return new Promise(resolve => {
  //           let id = e.currentTarget.dataset.id
  //           console.log(id)
  //           this.setData({
  //             buyer_id: id
  //           })
  //           wx.request({
  //             url: `${app.hostName}buyer/${this.data.buyer_id}/unFollow`,
  //             method: 'DELETE',
  //             header: {
  //               'Authorization': `Bearer ${app.token}`
  //             },
  //             dataType: 'json',
  //             success: (res) => {
  //               let is_followed = !this.data.is_followed;
  //               this.setData({
  //                 is_followed
  //               })
  //               resolve(res.data.data);
  //             }
  //           })
  //         })
  //       }
  //     },
  //   })
  // }


  onUnfollowBtnClick(e) {
    let buyer_id = e.currentTarget.dataset.id;
    console.log(buyer_id)
    this.setData({
      buyer_id: buyer_id
    })
    console.log(buyer_id)

    wx.request({
      url: `${app.hostName}buyer/${this.data.buyer_id}/unFollow`,
      method: 'DELETE',
      header: {
        'Authorization': `Bearer ${app.token}`
      },
      dataType: 'json',
      success: (res) => {
        for (let i in this.data.followList) {
          if (buyer_id === this.data.followList[i].buyer_id) {
            let is_followed = !this.data.is_followed;
            console.log(this.data.showList[i].is_followed)
          }
        }
        this.setData({
          is_followed,
        })
      }
    })
  },

  onFollowBtnClick(e) {
    let buyer_id = e.currentTarget.dataset.id;
    console.log(buyer_id)
    this.setData({
      buyer_id: buyer_id
    })
    console.log(buyer_id)

    wx.request({
      url: `${app.hostName}buyer/${this.data.buyer_id}/follow`,
      method: 'POST',
      data: {
        id: this.data.buyer_id
      },
      header: {
        'Authorization': `Bearer ${app.token}`
      },
      dataType: 'json',
      success: (res) => {
        for (let i in this.data.followList) {
          if (buyer_id === this.data.followList[i].buyer_id) {
            this.data.followList[i].is_followed = false;
            console.log(this.data.showList[i].is_followed)
          }
        }
        this.setData({
          followList: this.data.followList,
        })
      }
    })
  }
})