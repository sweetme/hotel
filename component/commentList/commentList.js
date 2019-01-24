// component/loading/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentPage: {
      type: 'string',
      value: 'tabIndex'
    },
    commentList: {
      type: 'string',
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadComment: function(e) { // 列表上拉加载
      this.triggerEvent('loadComment', e);
    }
  }
})
