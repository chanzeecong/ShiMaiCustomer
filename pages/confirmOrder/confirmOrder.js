const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    attrId: 0,
    addrId: 0,
    userInfo: {},
    id: 0,
    defaultAddr: {
      region: ``,
    },
    couponList: [],
    couponInfo: {},
    goodDetail: {},
    amount: 1,
    totalPrice: 0,
    comment: ``,
    showModalStatus: false, //是否显示
    tabList: [{
      id: 1,
      label: `可用红包`
    },
    {
      id: 3,
      label: `不可用红包`
    },
    ],
    currentTab: 0,
    borderTab: [0, 3],
    scrollToLeft: 0,
    valueId: ``,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      attrId: Number(options.attrId),
      addrId: Number(options.addrId),
      id: Number(options.id),
			amount: Number(options.amount)
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

  useValue(e) {
    let valueId = e.currentTarget.dataset.id;
<<<<<<< HEAD
    let couponList = this.data.couponList;

		for(let i in couponList)
		{
			if (valueId == couponList[i].id)
			{
				console.log(couponList[i].id)
				let couponNum = couponList[i].coupon.coupon_amount;
				console.log(couponNum)

				this.setData({
					couponNum: couponNum
				})

				break;
			}
		}

    this.hideModal();
    this.setData({
      valueId: valueId,
      couponList: couponList
=======
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}coupon`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          status: 1
        },
        dataType: `json`,
        success: (res) => {
          resolve(res.data.data);
          let couponInfo = res.data.data;
          this.setData({
            couponInfo: couponInfo,
            valueId: valueId
          })
          console.log(couponInfo)
          this.hideModal();
        }
      })
>>>>>>> 162b6715e9bd36175bea75a2385b84f106dd6877
    })
  },

  onCutCountBtnClick() {
    let goodDetail = this.data.goodDetail;

    let amount = Math.max(this.data.amount - 1, 1);

    let totalPrice = (goodDetail.price * amount) + Number(goodDetail.transportation_costs) + Number(goodDetail.tax_fee);

    totalPrice = totalPrice.toFixed(2)

    this.setData({
      goodDetail: goodDetail,
      totalPrice: totalPrice,
      amount: amount
    })
  },
  onAddCountBtnClick() {
    let goodDetail = this.data.goodDetail;
    let amount = Math.min(this.data.amount + 1, 9)

    let totalPrice = (goodDetail.price * amount) + Number(goodDetail.transportation_costs) + Number(goodDetail.tax_fee);

    totalPrice = totalPrice.toFixed(2)

    this.setData({
      goodDetail: goodDetail,
      totalPrice: totalPrice,
      amount: amount
    })
  },

  onOrderAmounctInput(e) {
    let goodDetail = this.data.goodDetail;
    let amount = Number(e.detail.value);

    if (`` === amount || NaN === amount) {
      this.setData({
        amount: 1
      })
    } else {

      amount = Math.min(amount, 9)
      amount = Math.max(amount, 1)

      let totalPrice = (goodDetail.price * amount) + Number(goodDetail.transportation_costs) + Number(goodDetail.tax_fee);

      totalPrice = totalPrice.toFixed(2)

      this.setData({
        goodDetail: goodDetail,
        totalPrice: totalPrice,
        amount: amount
      })
    }

  },

  onPaidBtnClick() {
    let goodDetail = this.data.goodDetail;

    if (!this.data.defaultAddr) {
      wx.showToast({
        title: '请选择收货地址',
        icon: `none`
      })
      return;
    }

    wx.showLoading({
      title: '',
    })

    new Promise(resolve => {
      wx.request({
        url: `${app.hostName}order/${goodDetail.id}/payment`,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          address_id: this.data.defaultAddr.id.toString(),
          amount: this.data.amount.toString(),
          comment: this.data.comment,
          valueId:this.data.valueId,
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data);
        }
      })
    }).then(data => {
      console.log(data)
      wx.hideLoading()

      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: (res) => {
          wx.navigateTo({
            url: `../payResult/payResult?result=1&id=${goodDetail.id}&`,
          })
        },
        fail: (res) => {
          wx.navigateTo({
            url: `../payResult/payResult?result=0&id=${goodDetail.id}`,
          })
        }
      })
    })

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
    let couponList = await this.getCoupon(status);
    console.log(couponList)

    if (couponList === undefined) {
      couponList = [];
    }

    this.setData({
      currentTab: currentTab,
      scrollToLeft: scrollToLeft,
      borderTab: [leftTab, rightTab],
      couponList: couponList
    })
  },

  async initPageData() {
    wx.showLoading({
      title: '订单信息加载中',
    })

    let userInfo = await this.getUserInfo();
    let defaultAddr = ``;

    if (this.data.addrId) {
      defaultAddr = await this.getAddrDetail();

    } else {
      let addrList = await this.getAddrList();

      for (let addr of addrList) {
        console.log(addr.is_default)
        if (addr.is_default) {
          defaultAddr = addr;
          break;
        }
      }
    }
    console.log(defaultAddr)
    
    let status = this.data.tabList[this.data.currentTab].id;
    let couponList = await this.getCoupon(status);
    console.log(couponList);
    let goodDetail = await this.getGoodDetail();
    let totalPrice = (goodDetail.price * this.data.amount) + Number(goodDetail.transportation_costs) + Number(goodDetail.tax_fee);
    
    totalPrice = totalPrice.toFixed(2)
    wx.hideLoading();
    this.setData({
      userInfo: userInfo,
      defaultAddr: defaultAddr,
      goodDetail: goodDetail,
      totalPrice: totalPrice,
      addrId: defaultAddr.id,
      couponList: couponList
    })
  },
  // 红包列表获取
  getCoupon(status) {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}coupon`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          status: status
        },
        dataType: `json`,
        success: (res) => {
          resolve(res.data.data);
          console.log(res.data.data)
        }
      })
    })
  },

  getUserInfo() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}customer`,
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
  getAddrList() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}address`,
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
  getAddrDetail() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}address/${this.data.addrId}`,
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
  getGoodDetail() {
    return new Promise(resolve => {
      wx.request({
        // url: `${app.hostName}customerOrder`,
        url: `${app.hostName}order`,

        method: 'POST',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          good_attr_id: this.data.attrId
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data);
        }
      })
    })
  },
  onCommentInput(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  usecoupon() {
    this.showModal();
  },

  //显示对话框
  showModal: function() {
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
  //隐藏对话框
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

  
})