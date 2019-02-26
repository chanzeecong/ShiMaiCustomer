const QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
const regeneratorRuntime = require('../../lib/runtime.js');
const WxParse = require('../../wxParse/wxParse.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qqmapsdk: ``,
    customStep: 0,
    customTag: ``,
    tagList: [`家`, `公司`, `学校`],
    addrId: 0,
    addrDetail: {},
    currentTagIndex: -1,
    isDefaultAddrDisabled: true,
    isExistDefaultAddr: false,
    currentCountry: {
      cn: ``,
      en: ``,
      code: ``
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.qqmapsdk = new QQMapWX({
      key: 'Y35BZ-MCX35-ZHOIA-QSUVR-3NJTF-7YB64'
    });

    this.setData ({
      addrId: Number (options.id)
    })

    this.initPageData()
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

  checkAllValue(){
    
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

  onSysAddrLabelBtnClick (e) {
    let index = e.currentTarget.dataset.index;
    this.data.addrDetail.tag = this.data.tagList[index];

    this.setData ({
      currentTagIndex: index,
      customStep: 0,
      customTag: this.data.tagList[index],
      addrDetail: this.data.addrDetail
    })
  },

  onCustomLabelInput (e) {
    this.setData ({
      customTag: e.detail.value
    })
  },

  addAddrLabelBtnClick () {
    this.setData ({
      customStep: 1,
      currentTagIndex: -1,
      customTag: ``
    })
  },

  onConfirmAddrLabelBtnClick () {
    let customStep = 0;
    let currentTagIndex = 0;

    if (this.data.customTag) {
      customStep = 2;
    }

    if (`` !== this.data.customTag) {
      currentTagIndex = -1;
      this.data.addrDetail.tag = this.data.customTag;
    } else {
      this.data.addrDetail.tag = this.data.tagList[0];
    }

    this.setData({
      customStep: customStep,
      currentTagIndex: currentTagIndex,
      addrDetail: this.data.addrDetail
    })
    
  },

  onEditAddrLabelBtnClick() {
    this.setData({
      customStep: 1,
      currentTagIndex: -1
    })
  },

  onLocalBtnClick () {
    new Promise (resolve => {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.address']) {
            wx.authorize({
              scope: 'scope.address',
              success() {
                // console.log(`？？？？`)
                resolve()
              }
            })
          } else {
            // console.log(`？`)
            resolve()
          }
        }
      })
    }).then (() => {
      wx.chooseAddress({
        success: (res) => {
          console.log (res)

          this.data.addrDetail.region = `${res.provinceName} ${res.cityName} ${res.countyName}`;
          this.data.addrDetail.address = `${res.detailInfo}`;

          this.setData({
            addrDetail: this.data.addrDetail
          })
        }
      })
    })
  },

  async initPageData() {
    let checkContent = await this.getPlatform ();
    WxParse.wxParse('checkContent', 'html', checkContent, this);

    let addrDetail = {
      receiver_name: ``,
      phone: ``,
      phone_code: ``,
      region: ``,
      id_card_no: ``,
      id_card_front_img: ``,
      id_card_back_img: ``,
      address: ``,
      tag: ``,
      is_default: 0
    };

    if (this.data.addrId) {
      addrDetail = await this.getAddrDetail();
    }

    let addrList = await this.getAddrList();
    let isDefaultAddrDisabled = true;
    let isExistDefaultAddr = false;

    for (let addr of addrList) {
      if (addr.is_default) {
        isDefaultAddrDisabled = addrDetail.is_default ? true : false;
        isExistDefaultAddr = true;
        break;
      }
    }

    if (!isExistDefaultAddr) {
      isDefaultAddrDisabled = true;
      addrDetail.is_default = 1;
    }
    
    let tag = addrDetail.tag;
    let currentTagIndex = -1;

    for (let i in this.data.tagList) {
      if (tag === this.data.tagList[i]) {
        currentTagIndex = Number (i);
        break;
      }
    }

    let countryList = await this.getCountry();

    this.data.currentCountry.code = addrDetail.phone_code;

    this.setData ({
      addrDetail: addrDetail,
      frontImg: addrDetail.id_card_front_img,
      backImg: addrDetail.id_card_back_img,
      currentTagIndex: currentTagIndex,
      isDefaultAddrDisabled: isDefaultAddrDisabled,
      isExistDefaultAddr: isExistDefaultAddr,
      countryList: countryList,
      currentCountry: this.data.currentCountry
    })
  },

  getCountry() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}countryCode`,
        method: 'GET',
        dataType: 'json',
        success: (res) => {
          resolve(res.data);
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

  onNameInput (e) {

    this.data.addrDetail.receiver_name = e.detail.value
    this.setData ({
      addrDetail: this.data.addrDetail
    })
  },

  onPhoneInput (e) {
    this.data.addrDetail.phone = e.detail.value
    this.setData({
      addrDetail: this.data.addrDetail
    })
  },

  onPhoneInput(e) {
    this.data.addrDetail.phone = e.detail.value
    this.setData({
      addrDetail: this.data.addrDetail
    })
  },

  onRegionInput (e) {
    this.data.addrDetail.region = e.detail.value
    this.setData({
      addrDetail: this.data.addrDetail
    })
  },

  onIDNumInput (e) {
    this.data.addrDetail.id_card_no = e.detail.value
    this.setData({
      addrDetail: this.data.addrDetail
    })
  },

  onAddrTextArea (e) {
    this.data.addrDetail.address = e.detail.value
    this.setData({
      addrDetail: this.data.addrDetail
    })
  },

  async onFrontImgClick (e) {
    let img = await app.chooseImage(1);

    if (img[0]) {
      this.data.addrDetail.id_card_front_img = img[0]
    }

    this.setData({
      addrDetail: this.data.addrDetail
    })
  },

  async onBackImgClick(e) {
    let img = await app.chooseImage(1);

    if (img[0]) {
      this.data.addrDetail.id_card_back_img = img[0]
    }

    this.setData({
      addrDetail: this.data.addrDetail
    })
  },

  onSetDefaultBtnClick (e) {

    this.data.addrDetail.is_default = e.detail.value ? 1 : 0;
    
    this.setData ({
      addrDetail: this.data.addrDetail
    })
  },

  isEditAddr () {
    let isEdit = true;
    let title = ``;

    let regPhone = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    let regIdNumber = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{2}[0-9Xx]$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[0-9Xx]$/;


    if (`` === this.data.addrDetail.receiver_name) {
      title = `收货人不能为空`;
      isEdit = false;
    } else if (!regPhone.test(this.data.addrDetail.phone)) {
      title = `手机号码格式不正确`;
      isEdit = false;
    } else if (`` === this.data.addrDetail.region) {
      title = `所在地区不能为空`;
      isEdit = false;
    } else if (!regIdNumber.test(this.data.addrDetail.id_card_no)) {
      title = `身份证号格式不正确`;
      isEdit = false;
    } else if (`` === this.data.addrDetail.id_card_front_img || `` === this.data.addrDetail.id_card_back_img) {
      title = `请上传身份证照`;
      isEdit = false;
    } else if (`` === this.data.addrDetail.address) {
      title = `详细地址不能为空`;
      isEdit = false;
    } else if (`` === this.data.addrDetail.tag) {
      title = `请确认地址标签`;
      isEdit = false;
    } 

    if (!isEdit) {
      wx.showToast({
        title: title,
        icon: `none`
      })
    }

    return isEdit;

  },

  onAddBtnClick () {
    let isEdit = this.isEditAddr();

    if (!isEdit) {
      return;
    }

    new Promise(resolve => {
      wx.request({
        url: `${app.hostName}address`,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        data: {
          receiver_name: this.data.addrDetail.receiver_name,
          phone: this.data.addrDetail.phone,
          phone_code: `0086`,
          region: this.data.addrDetail.region,
          id_card_no: this.data.addrDetail.id_card_no,
          id_card_front_img: this.data.addrDetail.id_card_front_img,
          id_card_back_img: this.data.addrDetail.id_card_back_img,
          address: this.data.addrDetail.address,
          tag: this.data.addrDetail.tag,
          is_default: this.data.addrDetail.is_default
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data);
        }
      })
    }).then(result => {

      let title = `新建失败,请重试`;

      if (200 === result.status_code) {
        title = `新建地址成功`;

        setTimeout (()=> {
          wx.navigateBack({
            detail: 1
          })
        }, 800)
      }

      wx.showToast({
        title: title,
        icon: `none`
      })
      
    })
  },

  onSaveBtnClick () {

    let isEdit = this.isEditAddr();

    if (!isEdit) {
      return;
    }

    new Promise(resolve => {
      wx.request({
        url: `${app.hostName}address/${this.data.addrId}`,
        method: 'PUT',
        header: {
          'Authorization': `Bearer ${app.token}`,
        },
        data: {
          receiver_name: this.data.addrDetail.receiver_name,
          phone: this.data.addrDetail.phone,
          phone_code: this.data.currentCountry.code,
          region: this.data.addrDetail.region,
          id_card_no: this.data.addrDetail.id_card_no,
          id_card_front_img: this.data.addrDetail.id_card_front_img,
          id_card_back_img: this.data.addrDetail.id_card_back_img,
          address: this.data.addrDetail.address,
          tag: this.data.addrDetail.tag,
          is_default: this.data.addrDetail.is_default.toString ()
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data);
        }
      })
    }).then(result => {
      let title = `保存失败,请重试`;

      if (200 === result.status_code) {
        title = `保存地址成功`;

        setTimeout(() => {
          wx.navigateBack({
            detail: 1
          })
        }, 800)
      }

      wx.showToast({
        title: title,
        icon: `none`
      })
    })
  },

  getPlatform() {
    return new Promise (resolve => {
      wx.request({
        url: `${app.hostName}platform?title=为什么要传身份证？`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data.content)
        }
      })
    })
  },

  onDeleteBtnClick () {
    new Promise(resolve => {
      wx.request({
        url: `${app.hostName}address/${this.data.addrId}`,
        method: 'DELETE',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res);
        }
      })
    }).then (data => {
      wx.showToast({
        title: '删除成功',
        icon: `none`
      })

      setTimeout (() => {
        wx.navigateBack({
          delta: 1
        })
      }, 800)
    })
  },

  onCountryChanged(e) {
    this.setData({
      currentCountry: this.data.countryList[e.detail.value]
    })
  }
})