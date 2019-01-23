// pages/user/user.js
//获取应用实例
const app = getApp()

Page(app.$CREATE_PAGE({
  data: {
    imgUrls:app.globalData.imgSrc + 'demo.jpg',
    img: app.globalData.imgSrc
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  handleTest: function () {
    app.$Msg('111');
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: '凯里宾馆',
      path: 'pages/index/index',
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  }
}))
