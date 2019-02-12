// pages/myhistory/myhistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAll: false,
    manageActive: false,
    activeCheckBox: '',
    showList:
    [
      { id: '1', img: '../../assets/img/text-img.png', title: '一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有', price: '99', tag: '识买精选', time: '2018-10-26', comments: '15621', checked: '' },
      { id: '2', img: '../../assets/img/text-img.png', title: '一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有一直以来，音乐的加入，都可以让运动的过程变得更加快乐，前提是有', price: '99', tag: '识买精选', time: '2018-10-26', comments: '15621', checked: '' }
    ]
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

  },
  toggleManage(){
    let activeClass = '';
    let activeFlag = this.data.manageActive;
    activeFlag = !activeFlag;
    if (activeFlag ){
      activeClass = 'active';
    }else{
      activeClass = '';
    }

    this.setData({
      manageActive: activeFlag,
      activeCheckBox: activeClass
    })
  },

  listSelection(e){
  },

  selectAll(e){
    let selectAll = e.detail.value[0];
    let allList = this.data.showList;
    if (selectAll){
      allList.forEach(item=>{
        item.checked = 'true'
      })

      this.setData({
        showList: allList
      })
    }else{
      allList.forEach(item => {
        item.checked = ''
      })

      this.setData({
        showList: allList
      })
    }
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