// pages/search_list/search_list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    innerHeight: '667px',
    wrapperHeight: '667px',
    sortActive: '',
    sortActiveState: '',
    buyerList: [
      { id: 'b_1', name: 'Jane', area: '法国', badge: ['法国代购', '香水', '包'], state: true, img: '../../assets/img/4.png' },
      { id: 'b_2', name: 'Jane2', area: '美国', badge: ['美国代购', '香水', '包'], state: true, img: '../../assets/img/4.png' },
      { id: 'b_3', name: 'Jane3', area: '英国', badge: ['英国代购', '香水', '包'], state: true, img: '../../assets/img/4.png' },
      { id: 'b_4', name: 'Jane4', area: '日本', badge: ['日本代购', '香水', '包'], state: true, img: '../../assets/img/4.png' },
    ],
    sortItems: [
      { name: 'USA', value: '综合排序', checked: 'true' },
      { name: 'CHN', value: '按时间排序' },
      { name: 'BRA', value: '按热度排序' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.searchValue) {
      this.setData({
        searchValue: options.searchValue
      });
    }

    this.setData({
      innerHeight: `${app.windowHeight - 80}px`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.innerHeight);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  showSort(){
    this.setData({
      sortActive: 'active',
      sortActiveState: 'in',
      wrapperHeight: `${app.windowHeight}px`
    })
  },
  hideSort(){
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
  sortChange(e){
    console.log(e);
    this.hideSort();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})