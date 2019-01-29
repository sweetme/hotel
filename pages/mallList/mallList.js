//mall.js
//获取应用实例
const app = getApp()

Page(app.$CREATE_PAGE({
  data: {
    id:"",
    img: app.globalData.imgSrc,
    data: [
      { type: "新品", name: "贵宾饮品", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "新品", name: "贵宾饮品", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "新品", name: "贵宾饮品", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "新品", name: "贵宾饮品", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "新品", name: "贵宾饮品", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "新品", name: "贵宾饮品", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "新品", name: "贵宾饮品", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 }
    ],
    sum: 0,
    currentSum: 0
  },
  onLoad: function (options) {
    if (options.id){
      console.log(options.id)
      this.setData({
        id: options.id
      })
    }
  },
  getShopCart: function () { // 购物车去结算
    let data = this.data.data;
    let cart = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].selectNum > 0) {
        let shopCart = {};
        shopCart.Cartid = i;
        shopCart.Cartnum = data[i].selectNum;
        cart.push(shopCart);
      }
    }
    console.log(cart);
  },
  count: function (datas) { //获取组件传递的购物车统计
    console.log(datas)
    let data = datas.detail;
    let sum = data.sum;
    let currentSum = data.currentSum;
    let info = data.info;
    let foodList = datas.detail.data;
    this.setData({
      sum: sum,
      currentSum: currentSum,
      data: foodList
    })
    
  },
  detailTap: function (datas) { //详情页跳转
    let data = datas.detail;
    let postId = data.currentIndex;
    if (postId != "" || postId != undefined) {
      wx.setStorageSync('id', postId);//第一次点击之后存储数据在本地
      wx.navigateTo({
        url: '../mallInfo/mallInfo?id=' + postId,
      })
    }
  },
  upLoad: function () {//上拉加载列表
    console.log("upLoad")
  }
}))