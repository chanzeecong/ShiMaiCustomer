const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        id: '',
        label: `全部`
      },
      {
        id: 0,
        label: `待付款`
      },
      {
        id: 2,
        label: `待收货`
      },
      {
        id: 3,
        label: `已完成`
      },
      {
        id: -1,
        label: `已取消`
      }
    ],
    currentTab: 0,
    borderTab: [0, 3],
    scrollToLeft: 0,
    orderList: [],
    orderDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currentTab = Number(options.tab);
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

    this.setData({
      currentTab: currentTab,
      scrollToLeft: scrollToLeft
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
    let orderList = await this.getOrderList(status);
    console.log(orderList)

    if (orderList === undefined) {
      orderList = [];
    }

    this.setData({
      currentTab: currentTab,
      scrollToLeft: scrollToLeft,
      orderList: orderList
    })
  },

  /*countDown(yy, MM, dd, hh, mm, ss) {
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

      for (let i in this.data.orderList) {
        let orderDetail = this.data.orderList[i];

        if (0 == orderDetail.status) {
          orderDetail.countDownDay = day;
          orderDetail.countDownHour = hour;
          orderDetail.countDownMin = minute;
          orderDetail.countDownSec = second;

          this.setData({
            orderDetail: orderDetail
          })

          setTimeout(() => {
            this.countDown(yy, MM, dd, hh, mm, ss);
          }, 1000);
        }
      }
    } else {
      orderDetail.countDownDay = 0;
      orderDetail.countDownHour = 0;
      orderDetail.countDownMin = 0;
      orderDetail.countDownSec = 0;
    }
  },*/

  async initPageData() {
    let status = this.data.tabList[this.data.currentTab].id
    let orderList = await this.getOrderList(status);

    this.setData({
      orderList: orderList,
    })

    /*for (let i in orderList) {
      let orderDetail = orderList[i];

      if (0 === orderDetail.status) {
        let date = orderDetail.created_at;
        let arr = date.split(` `);
        let arr0 = arr[0].split(`-`);
        let arr1 = arr[1].split(`:`);

        console.log(arr0[0], arr0[1], Number(arr0[2]) + 5, arr1[0], arr1[1], 0)

        this.countDown(arr0[0], arr0[1], Number(arr0[2]) + 5, arr1[0], arr1[1], 0);
      }
    }    */
  },

  getOrderList(status) {
    if (status === undefined || status === -2) {
      return new Promise(resolve => {
        wx.request({
          url: `${app.hostName}order`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${app.token}`
          },
          dataType: 'json',
          success: (res) => {
            resolve(res.data.data)
          }
        })
      })
    } else {
      return new Promise(resolve => {
        wx.request({
          url: `${app.hostName}order`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${app.token}`
          },
          data: {
            status: status
          },
          dataType: 'json',
          success: (res) => {
            resolve(res.data.data);
          }
        })
      })
    }
  },

  onExpressBtnClick(e) {
    wx.navigateTo({
      url: `../expressDetail/expressDetail?id=${e.currentTarget.dataset.id}`,
    })
  },

  onDeliveryBtnClick(e) {
    let index = e.currentTarget.dataset.index;

    let orderId = this.data.orderList[index].id;
    wx.navigateTo({
      url: `../delivery/delivery?orderId=${orderId}`,
    })
  },

  onDeleteOrderBtnClick(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let _this = this;

    wx.showModal({
      title: '删除订单之后，将无法找回',
      content: '是否删除订单',
      cancelColor: `rgba(0,0,0,.6)`,
      cancelText: `否`,
      confirmText: `是`,
      confirmColor: `#FE5968`,
      success(res) {

        if (res.cancel) {
          return;
        }

        new Promise(resolve => {
          wx.request({
            url: `${app.hostName}order/${id}`,
            method: 'DELETE',
            header: {
              'Authorization': `Bearer ${app.token}`
            },
            dataType: 'json',
            success: (res) => {
              resolve(res.data)
            }
          })
        }).then(data => {
          let title = `操作失败`;
          console.log(data)

          if (200 === data.status_code) {
            title = `操作成功`;

            _this.data.orderList.splice(index, 1);
            _this.setData({
              orderList: _this.data.orderList
            })
          }

          wx.showToast({
            title: title,
            icon: `none`
          })
        })
      }
    })
  },
  onBuyAgainBtnClick(e) {
    console.log(e)
    let attrId = Number(e.currentTarget.dataset.attrid)
    wx.navigateTo({
      url: `../confirmOrder/confirmOrder?attrId=${attrId}`,
    })
  },
  onPayBtnClick(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../orderDetail/orderDetail?id=${id}`,
    })
  },

  onConfirmOrderBtnClick(e) {
    let id = e.currentTarget.dataset.id;

    new Promise(resolve => {
      wx.request({
        url: `${app.hostName}order/${id}/received`,
        method: 'PUT',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data)
        }
      })
    }).then(data => {
      let title = `操作失败`;
      console.log(data)

      if (201 === data.status_code) {
        title = `操作成功`;

        setTimeout(() => {
          wx.navigateTo({
            url: `../orderDetail/orderDetail?id=${id}`,
          })
        }, 800)
      }

      wx.showToast({
        title: title,
        icon: `none`
      })
    })
  },

  onBackBtnClick() {
    wx.switchTab({
      url: '../discover/discover',
    })
  }
})