// pages/card_bag/card_bag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabActive: ['active', '', '', ''],
    currentTab: 0,
    showData:  [
        { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'useful' },
        { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'disabled' },
        { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'used' }
    ],
    allData: [],
    useful: [],
    disabled: [],
    used: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.spitAllData();
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

  spitAllData(){
    
    let allData = [
      { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'useful' },
      { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'disabled' },
      { id: '1', title: '无门槛红包', value: '50', tag: '识买商城专用券', starttime: '2018.11.10 00:00', endtime: '2018.12.10 23:00', status: 'disabled' }
    ];
    // console.log(this.isString(allData) === '[object Array]');
    let useFul = [];
    let disabled = [];
    let used = [];

    if (this.isString(allData)==='[object Array]'){
      allData.forEach(item => {
        switch (item.status) {
          case 'useful':
            useFul.push(item);
            break;
          case 'disabled':
            disabled.push(item);
            break;
          case 'used':
            used.push(item);
            break;
          default:
            break;
        }
      })

      this.setData({
        allData: allData,
        useful: useFul,
        disabled: disabled,
        used: used
      })
    }
  },

  isString(data){
    return Object.prototype.toString.call(data);
  },

  chooseTab(e){
    let tabIndex = e.target.dataset.status || this.data.currentTab.toString();
    // console.log(tabIndex)
    let currentTab = this.data.currentTab.toString();
    let clearArray = ['', '', '', ''];
    clearArray[tabIndex] = 'active';

    let allData = this.data.allData;
    let useFul = this.data.useful;
    let disabled = this.data.disabled;
    let used = this.data.used;
    let showDataArray = this.data.showData;

    if ( currentTab !== tabIndex ) {
      switch (tabIndex) {
        case '1':
          showDataArray = useFul;
          // console.log('未使用')
        break;
        case '2':
          showDataArray = used;
          // console.log('已使用');
        break;
        case '3':
          showDataArray = disabled;
          // console.log('已过期')
        break;
        default:
          showDataArray = allData;
          // console.log('全部')
        break;
      }
    }

    this.setData({
      tabActive: clearArray,
      currentTab: tabIndex,
      showData: showDataArray
    })
    // console.log(this.data.currentTab)
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