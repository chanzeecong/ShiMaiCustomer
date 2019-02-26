const regeneratorRuntime = require('../../lib/runtime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [],
    helpList: [],
    type: `常见问题`,
    searchType: ``,
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

  async initPageData() {
    let helpList = await this.getHelpList();
    let typeArr = await this.getTypeList();

    console.log(typeArr)
    let typeList = [];
    for (let i = 0; i < typeArr.length; i += 8) {
      console.log(i)
      let itme = {
        topList: [],
        bottomList: []
      };

      if (typeArr[i]) {
        itme.topList.push(typeArr[i]);
      } else {
        itme.topList.push(``)
        itme.topList.push(``)
        itme.topList.push(``)
        itme.topList.push(``)
        typeList.push(itme)
        break;
      }

      console.log(typeList)

      if (typeArr[i + 1]) {
        itme.topList.push(typeArr[i + 1])
      } else {
        itme.topList.push(``)
        itme.topList.push(``)
        itme.topList.push(``)
        typeList.push(itme)
        break;
      }

      if (typeArr[i + 2]) {
        itme.topList.push(typeArr[i + 2])
      } else {
        itme.topList.push(``)
        itme.topList.push(``)
        typeList.push(itme)
        break;
      }

      if (typeArr[i + 3]) {
        itme.topList.push(typeArr[i + 3])
      } else {
        itme.topList.push(``)
        typeList.push(itme)
        break;
      }

      if (typeArr[i + 4]) {
        itme.bottomList.push(typeArr[i + 4])
      } else {
        itme.bottomList.push(``)
        itme.bottomList.push(``)
        itme.bottomList.push(``)
        itme.bottomList.push(``)
        typeList.push(itme)
        break;
      }

      if (typeArr[i + 5]) {
        itme.bottomList.push(typeArr[i + 5])
      } else {
        itme.bottomList.push(``)
        itme.bottomList.push(``)
        itme.bottomList.push(``)
        typeList.push(itme)
        break;
      }

      if (typeArr[i + 6]) {
        itme.bottomList.push(typeArr[i + 6])
      } else {
        itme.bottomList.push(``)
        itme.bottomList.push(``)
        typeList.push(itme)
        break;
      }

      if (typeArr[i + 7]) {
        itme.bottomList.push(typeArr[i + 7])
      } else {
        itme.bottomList.push(``)
        itme.bottomList.push(``)
        typeList.push(itme)
        break;
      }

      typeList.push(itme)
    }

    this.setData({
      helpList: helpList,
      typeList: typeList,
      type: `常见问题`
    })
  },

  getHelpList() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}help?type=常见问题`,
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
  },
  getTypeList() {
    return new Promise(resolve => {
      wx.request({
        url: `${app.hostName}platformType`,
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
  },

  onTypeBtnClick(e) {
    let type = e.currentTarget.dataset.type;

    new Promise(resolve => {
      wx.request({
        url: `${app.hostName}help?type=${type}`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${app.token}`
        },
        dataType: 'json',
        success: (res) => {
          resolve(res.data.data)
        }
      })
    }).then(data => {
      this.setData({
        helpList: data,
        type: type
      })
    })
  },

  onHelpInput(e) {
    // this.setData ({
    //   searchType: e.detail.value,
    //   type: ``
    // })

    let type = e.detail.value;
    console.log(type)

    if (`` === type) {
      this.initPageData();
    } else {
      new Promise(resolve => {
        wx.request({
          url: `${app.hostName}help?type=${type}`,
          method: 'GET',
          header: {
            'Authorization': `Bearer ${app.token}`
          },
          dataType: 'json',
          success: (res) => {
            resolve(res.data.data)
          }
        })
      }).then(data => {
        if (!data.length || undefined === data) {
          type = ``;
        }
        this.setData({
          helpList: data,
          type: type
        })
      })
    }
  }
})