// pages/search_list/search_list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    innerHeight: '667px',
    wrapperHeight: '667px',
    filterClass: '',
    filterInOut: '',
    sortActive: '',
    sortActiveState: '',
    buyerList: [
      { id: 'b_1', name: 'Jane', area: '法国', badge: ['法国代购', '香水', '包'], state: true, img: '../../assets/img/4.png' },
      { id: 'b_2', name: 'Jane2', area: '美国', badge: ['美国代购', '香水', '包'], state: true, img: '../../assets/img/4.png' },
      { id: 'b_3', name: 'Jane3', area: '英国', badge: ['英国代购', '香水', '包'], state: true, img: '../../assets/img/4.png' },
      { id: 'b_4', name: 'Jane4', area: '日本', badge: ['日本代购', '香水', '包'], state: true, img: '../../assets/img/4.png' },
    ],
    filterArray:[
      {
        title: '快捷筛选',
        type: 'multiple',
        child:[
          { name: 'USA', value: '识买优选' },
          { name: 'CHN', value: '特价' },
          { name: 'BRA', value: '包税' },
          { name: 'JPN', value: '包邮' },
        ]
      },
      {
        title: '品牌',
        type: 'multiple',
        child: [
          { name: 'Sykwgasoo', value: 'Sykwgasoo' },
          { name: 'WHOO', value: 'WHOO' },
        ]
      },
      {
        title: '价格',
        type: 'range',
        child: [
          { name: '最低价', value: 'lowprice' },
          { name: '最高价', value: 'highprice' },
        ]
      },
      {
        title: '物流方式',
        type: 'multiple',
        child: [
          { name: 'Sykwgasoo', value: '识买直邮' },
          { name: 'WHOO', value: '第三方直邮' },
        ]
      }
    ],
    items: [
      { name: 'USA', value: '识买优选' },
      { name: 'CHN', value: '特价', checked: 'true' },
      { name: 'BRA', value: '包税' },
      { name: 'JPN', value: '包邮' },
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
  getFilter(){
    this.setData({
      filterClass: 'active',
      filterInOut: 'in',
      wrapperHeight: `${app.windowHeight}px`
    })
  },
  closeFilter(){
    let timeout;
    clearTimeout(timeout);
    this.setData({
      filterInOut: 'out'
    })
    timeout = setTimeout(()=>{
      this.setData({
        filterClass: '',
        filterInOut: '',
        wrapperHeight: `auto`
      })
    },500)
  },
  checkboxChange(e){
    console.log(e.detail.value);
  },
  formSubmit(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset(){
    console.log('reset');
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