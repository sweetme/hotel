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
    currentSum: 0,
    commentList: [
      { id: 2, avatar: app.globalData.imgSrc + "demo.jpg", commentName: "小白", commentDate: "2019.01.02", commentCon: "味道不錯,很赞", commentImgs: [{ url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }] },
      { id: 2, avatar: app.globalData.imgSrc + "demo.jpg", commentName: "小白", commentDate: "2019.01.02", commentCon: "味道不錯,很赞", commentImgs: [{ url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }] }
    ]
  },
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
  },
  add: function (event) {
    let index = event.currentTarget.dataset.index
    let data = this.data.data;
    data[index].selectNum++;
    this.setData({
      data: data
    });
    this.countNum("add");
  },
  reduce: function (event) {
    let index = event.currentTarget.dataset.index;
    let data = this.data.data;
    data[index].selectNum--;
    this.setData({
      data: data,
    });
    this.countNum("reduce");
  },
  countNum: function (type) {
    let data = this.data.data;
    let currentSum = 0;
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].selectNum > 0) {
        sum += this.toFixed(data[i].selectNum * data[i].price);
        currentSum += this.toFixed(data[i].selectNum * data[i].currentPrice);
      }
    }
    if (type == "add") {
      this.setData({
        sum: this.toFixed(sum),
        currentSum: this.toFixed(currentSum)
      })
    } else {
      this.setData({
        sum: this.toFixed(sum),
        currentSum: this.toFixed(currentSum)
      })
    }
  },
  toFixed: function (num) {
    return parseFloat((num).toFixed(10))
  },
  detailTap: function (event) {
    let postId = event.currentTarget.dataset.id;
    if (postId != "" || postId != undefined) {
      wx.setStorageSync('id', postId);//第一次点击之后存储数据在本地
      wx.navigateTo({
        url: 'mallInfo?id=' + postId,
      })
    }
  },
  lower: function (e) { // 下拉加载
    console.log(e)
  }
}))