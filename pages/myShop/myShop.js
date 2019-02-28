const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
const downloadimg = require('../../utils/downloadimg.js');
Page({
  data: {
    buyerId: 0,
    buyer: {},
    goodList: [],
    deminsion: (app.globalData.width * 0.91) / 3,
    height: app.globalData.height,
    productionCount: 1,
    isShowCount: false,
    isBackTop: false,
    imgList: [],
    isShowImg: false,
    currentImgIndex: 0,
    showList: [],
  },
  onLoad: function (options) {

    this.setData ({
      buyerId: Number (options.id),
      isShowImg: false
    })

  },

  onShow: function () {

    this.initPageData ();
  },

  onTabClick(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },

  onSizeBtnClick(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;

    for (let i in this.data.goodList) {

      if (id === this.data.goodList[i].id) {

        for (let j in this.data.goodList[i].buyer_good_attr) {

          this.data.goodList[i].buyer_good_attr[j].isChoose = false;
        }

        this.data.goodList[i].buyer_good_attr[index].isChoose = true;
      }
    }

    this.setData({
      goodList: this.data.goodList
    })
  },

  onCreateOrderBtnClick(e) {
    let id = e.currentTarget.dataset.id;

    this.setData({
      isShowCount: true
    })
  },

  onMaskClick() {
    this.setData({
      isShowCount: false
    })
  },

  setCountDown() {
    for (let i in this.data.goodList) {
      let endDate = this.data.goodList[i].end_time;

      if (!endDate) {
        continue;
      }

      let arr = endDate.split(` `);
      let arr0 = arr[0].split(`-`);
      let arr1 = arr[1].split(`:`);

      this.countDown(Number(arr0[0]), Number(arr0[1]) - 1, Number(arr0[2]), Number(arr1[0]), Number(arr1[1]), Number(arr1[2]), Number(i))
    }
  },


  onEllipsisArticleBtnClick(e) {
    let index = e.currentTarget.dataset.index;
    // console.log(index);
    let goodList = this.data.goodList;
    if (goodList[index].isEllipsis) {
      goodList[index].isEllipsis = (goodList[index].isEllipsis === 1) ? 2 : 1;
    }
    console.log(goodList[index].isEllipsis);
    this.setData({
      goodList: goodList,
    })
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

      this.data.goodList[index].countDownDay = day;
      this.data.goodList[index].countDownHour = hour;
      this.data.goodList[index].countDownMin = minute;
      this.data.goodList[index].countDownSec = second;

      this.setData({
        goodList: this.data.goodList
      })

      setTimeout(() => {
        this.countDown(yy, MM, dd, hh, mm, ss, index);
      }, 1000);
    } else {
      this.data.goodList[index].countDownDay = 0;
      this.data.goodList[index].countDownHour = 0;
      this.data.goodList[index].countDownMin = 0;
      this.data.goodList[index].countDownSec = 0;
    }
  },

  onBackTopBtnClick() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  onPageScroll: function (e) {
    let scrollTop = e.scrollTop;
    let isBackTop = false;

    this.setData({
      isBackTop: (scrollTop >= app.globalData.windowHeiht) ? true : false
    });
  },

  async initPageData () {
    let buyerData = await this.getBuyerInfo ();
    let goodList = buyerData.buyer_good;
    console.log(goodList)

    for (let i in goodList) {

      let content = goodList[i].good_name;

      goodList[i].isEllipsis = (content.length < 100) ? 0 : 1;

      for (let j in goodList[i].good_attributes) {
        goodList[i].good_attributes[j].isChoose = false;
      }
    }

    this.setData ({
      buyer: buyerData.buyer,
      goodList: goodList
    })

    this.setCountDown ();
  },

  getBuyerInfo() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}buyer/${this.data.buyerId}/good`,
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

  onFollowBtnClick(e) {

    wx.request({
      url: `${app.hostName}buyer/${this.data.buyer.buyer_id}/follow`,
      method: 'POST',
      header: {
        'Authorization': `Bearer ${app.token}`
      },
      dataType: 'json',
      success: (res) => {
        this.data.buyer.is_followed = true;
        this.setData({
          buyer: this.data.buyer
        })
      }
    })
  },

  onUnfollowBtnClick(e) {

    wx.request({
      url: `${app.hostName}buyer/${this.data.buyer.buyer_id}/unFollow`,
      method: 'DELETE',
      header: {
        'Authorization': `Bearer ${app.token}`
      },
      dataType: 'json',
      success: (res) => {
        this.data.buyer.is_followed = false;
        this.setData({
          buyer: this.data.buyer
        })
      }
    })
  },

  onCreateOrderBtnClick(e) {
    let index = e.currentTarget.dataset.index;
    let good = this.data.goodList[index];

    let sizeList = good.buyer_good_attr;

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
      wx.navigateTo({
        url: `../createOrder/createOrder?id=${good.id}&attrId=${attrId}`,
      })
    } else {
      wx.showToast({
        title: '请选择规格后再下单',
        icon: `none`
      })
    }
  },

  onShoppingBtnClick(e) {

    let index = e.currentTarget.dataset.index;
    let good = this.data.goodList[index];

    let sizeList = good.buyer_good_attr;

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
      wx.navigateTo({
        url: `../confirmOrder/confirmOrder?attrId=${attrId}`,
      })
    } else {
      wx.showToast({
        title: '请选择规格后再下单',
        icon: `none`
      })
    }
  },

  onShareBtnClick(e) {
    let index = e.currentTarget.dataset.index;

    let item = this.data.goodList[index];

    console.log(item)

    new Promise(resolve => {
      wx.setClipboardData({
        data: item.good_name,
        success(res) {
          resolve(res.data)
        }
      })
    }).then(data => {
      wx.showToast({
        title: '内容已复制',
      });

      wx.showLoading({
        title: '正在保存',
      })

      setTimeout(() => {
        wx.hideLoading()
      }, 3000)

      if (item.videoPath === ''){
        let imgURLArr = item.images;
        let promiseArr = [];

        for (let img of imgURLArr) {
          let downloadUrl = img;
          let promise = new Promise(resolve => {

            if (!wx.saveImageToPhotosAlbum) {
              wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
              })
              return;
            }

            wx.getSetting({
              success(res) {
                resolve(res)
              }
            })
          }).then((res) => {

            if (!res.authSetting['scope.writePhotosAlbum']) {

              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  downloadimg.downloadImages(downloadUrl);
                },
                fail() {
                  wx.showToast({
                    icon: 'none',
                    title: '保存图片授权失败'
                  })
                }
              })
            } else {
              downloadimg.downloadImages(downloadUrl)
            }
          })

          promiseArr.push(promise)
        }

        Promise.all(promiseArr);
      } else {
        let downloadVideoPath = item.videoPath;
        let promise = new Promise(resolve => {

          if (!wx.saveImageToPhotosAlbum) {
            wx.showModal({
              title: '提示',
              content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
            return;
          }

          wx.getSetting({
            success(res) {
              resolve(res)
            }
          })
        }).then((res) => {

          if (!res.authSetting['scope.writePhotosAlbum']) {

            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                downloadimg.downloadVideo(downloadVideoPath);
              },
              fail() {
                wx.showToast({
                  icon: 'none',
                  title: '保存视频授权失败'
                })
              }
            })
          } else {
            downloadimg.downloadVideo(downloadVideoPath)
          }
        })
      }
      

    });
  },

  onHideImgBtnClick() {
    this.setData({
      imgList: [],
      isShowImg: false,
    })
  },

  onShowImgBtnClick(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let imgList = [];

    for (let good of this.data.goodList) {
      if (good.id === id) {
        imgList = good.images;
        break;
      }
    }

    this.setData({
      imgList: imgList,
      isShowImg: true,
      currentImgIndex: Number(index)
    })
  },
})
