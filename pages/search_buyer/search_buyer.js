// pages/search_buyer/search_buyer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    show: '',
    array: [
      { name: 'buyer', value: '买手', icon: '../../assets/icon/icon_buyer_white@2x.png', checked: 'true' },
      { name: 'tag', value: '标签', icon: '../../assets/icon/icon_bianqian_white@2x.png' },
      { name: 'area', value: '地区', icon: '../../assets/icon/icon_area_white@2x.png' }
    ],
    checkedValue: '买手'
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
    this.dialog = this.selectComponent("#dialog");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  showSelection(e){
    let showClass = 'show'; 
    let flag = this.data.flag;
    
    if (!flag){
      this.setData({
        show: showClass,
        flag: true
      })
    }else{
      this.setData({
        show: '',
        flag: false
      })
    }
  },
  radioChange(e){
    let value = e.detail.value;
    let name = '';
    switch (value) {
      case 'buyer':
        name='买手';
        break;
      case 'tag':
        name = '标签';
        break;
      case 'area':
        name = '地区';
        break;
    }
    this.setData({
      checkedValue: name
    })
  },

  showDialog() {
    this.dialog.showDialog();
  },
  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
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