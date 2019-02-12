// components/confirm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗标题
    title: {            
      type: String,   
      value: '标题'
    },
    // 弹窗内容
    content: {
      type: String,
      value: '弹窗内容'
    },
    // 弹窗取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideDialog(){
      this.setData({
        isShow: !this.data.isShow
      })
    },
    showDialog(){
      this.setData({
        isShow: !this.data.isShow
      })
    },
    _cancelEvent(){
      this.triggerEvent("cancelEvent");
    },
    _confirmEvent(){
      this.triggerEvent("confirmEvent");
    }
  }
})
