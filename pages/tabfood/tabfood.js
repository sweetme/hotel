//foodPage.js
//获取应用实例
const app = getApp()

Page(app.$CREATE_PAGE({
  data: {
    img: app.globalData.imgSrc,
    imgUrls: [
      app.globalData.imgSrc + 'demo.jpg',
      app.globalData.imgSrc + 'demo.jpg',
      app.globalData.imgSrc + 'demo.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    indicatorColor:"#939496",
    indicatorActiveColor:"#FFFFFF"
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
  detailTap: function (event) {
    let postId = event.currentTarget.dataset.id;
    if (postId != "" || postId != undefined) {
      wx.navigateTo({
        url: '../foodList/foodList?id=' + postId,
      })
    }
  }
}))
