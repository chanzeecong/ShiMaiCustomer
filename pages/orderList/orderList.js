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
        id: 1,
        label: `待发货`
      },
      {
        id: 2,
        label: `待收货`
      },
      {
        id: -1,
        label: `已取消`
      }
    ],
    currentTab: 0,
    borderTab: [0, 3],
    scrollToLeft: 0,
    orderList: []
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
      borderTab: borderTab,
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
      borderTab: [leftTab, rightTab],
      orderList: orderList
    })
  },

  async initPageData() {
    console.log(this.data.tabList);
    console.log(this.data.currentTab);
    let status = this.data.tabList[this.data.currentTab].id
    console.log(status);
    let orderList = await this.getOrderList(status);
    console.log(orderList);
    this.setData({
      orderList: orderList,
    })
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