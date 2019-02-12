// pages/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectionActive: '',
    scrollID: '',
    cate: [
      { id: '0', name: '关注', icon: '../../assets/icon/icon_aircraft@2x.png', active: 'active' },
      { id: '1', name: '推荐', icon: '../../assets/icon/icon_aircraft@2x.png', active: '' },
      { id: '2', name: '美妆', icon: '../../assets/icon/icon_aircraft@2x.png', active: '' },
      { id: '3', name: '母婴', icon: '../../assets/icon/icon_aircraft@2x.png', active: '' },
      { id: '4', name: '家电', icon: '../../assets/icon/icon_aircraft@2x.png', active: '' },
      { id: '5', name: '家居', icon: '../../assets/icon/icon_aircraft@2x.png', active: '' },
      { id: '6', name: '家居', icon: '../../assets/icon/icon_aircraft@2x.png', active: '' },
      { id: '7', name: '家居', icon: '../../assets/icon/icon_aircraft@2x.png', active: '' },
      { id: '8', name: '家居', icon: '../../assets/icon/icon_aircraft@2x.png', active: '' },
      { id: '9', name: '家居', icon: '../../assets/icon/icon_aircraft@2x.png', active: '' },
    ],
    scrollLeft: 0,
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

  showAllSelections(){
    this.showSelectionClass();
  },

  showSelectionClass() {
    let activeClass = 'active';
    this.setData({
      selectionActive: activeClass
    })
  },

  hideSelectionClass(){
    this.setData({
      selectionActive: ''
    })
  },

  chooseItem(e){
    let idx = e.currentTarget.dataset.index;
    console.log(idx);
    let cateList = this.data.cate;
    let scroll_id = `item_${idx}`;

    cateList.forEach((item, i) => {
        cateList[i].active = '';
    })

    cateList[idx].active = 'active';
    this.setData({
      cate: cateList,
      scrollID: scroll_id,
      selectionActive: ''
    })
  },

  chooseCategory(e){
    // console.log(e.target);
    let currentIdx = e.target.dataset.index;
    let offsetLeft = e.target.offsetLeft;
    let cateList = this.data.cate;
    let left = offsetLeft - 60;
    
    (left<0)? left = 0: '';

    cateList.forEach((item,i)=>{
      if (i === currentIdx){
        cateList[i].active = 'active';
      }else{
        cateList[i].active = '';
      }
    })

    this.setData({
      cate: cateList,
      scrollLeft: left
    })
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