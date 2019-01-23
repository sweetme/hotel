//food.js
//获取应用实例
const app = getApp()

Page(app.$CREATE_PAGE({
  data: {
    id:"",
    img: app.globalData.imgSrc,
    data: [
      { type: "预约", name: "农家小炒", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg",selectNum: 0 }, 
      { type: "预约", name: "农家小炒", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "预约", name: "农家小炒", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "预约", name: "农家小炒", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "预约", name: "农家小炒", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "预约", name: "农家小炒", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 },
      { type: "预约", name: "农家小炒", num: "99", currentPrice: "16.8", discount: "6.6", price: "26", url: app.globalData.imgSrc + "demo.jpg", selectNum: 0 }
    ],
    shopCart: [{ 'Cartid': '20', 'Cartnum': '1' }],
    sum:0,
    currentSum:0,
    isInfo:false,
    info:[],
    currentIndex:'',
    commentList: [
      { id: 2, avatar: app.globalData.imgSrc + "avatar.png", commentName: "小白", commentDate: "2019.01.02", commentCon: "味道不錯,很赞", commentImgs: [{ url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }]},
      { id: 2, avatar: app.globalData.imgSrc + "avatar.png", commentName: "小白", commentDate: "2019.01.02", commentCon: "味道不錯,很赞", commentImgs: [{ url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }]} 
    ]
  },
  onLoad: function (options ) {
    if (options.id){
      console.log(options.id)
      this.setData({
        id: options.id
      })
    }
  },
  add: function (event) {
    let index = event.currentTarget.dataset.index
    let data = this.data.data;
    data[index].selectNum ++;
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
  countNum: function(type) {
    let data = this.data.data;
    let currentSum = 0;
    let sum = 0;
    for (let i=0; i<data.length;i++){
      if (data[i].selectNum>0){
        sum += this.toFixed(data[i].selectNum * data[i].price);
        currentSum += this.toFixed(data[i].selectNum * data[i].currentPrice);
      }
    }
    this.setData({
      sum: this.toFixed(sum),
      currentSum: this.toFixed(currentSum)
    })
    if (this.data.isInfo){
      this.setData({
        info: this.data.data[this.data.currentIndex]
      });
    }
  
  },
  toFixed: function (num){
    return parseFloat((num).toFixed(10))
  },
  close: function (){
    this.setData({
      isInfo: false
    })
  },
  goInfo: function (event) {
    let index = event.currentTarget.dataset.index;
    let data = this.data.data;
    let info = data[index];
    this.setData({
      isInfo: true,
      info: info,
      currentIndex: index
    })
  },
  addNum: function() {
    let data = this.data.data;
    data[this.data.currentIndex].selectNum++;
    this.setData({
      data: data,
    });
    this.countNum("add");
  },
  reduceNum: function () {
    let data = this.data.data;
    data[this.data.currentIndex].selectNum--;
    this.setData({
      data: data,
    });
    this.countNum("reduce");
  },
  lower: function (e) { // 列表上拉加载
    console.log(e)
  },
  loadComment: function (e) { // 评论上拉加载
    console.log(e)
  },
  initData: function () {
    wx.request({
      url: request_getCategoryList,
      data: {
        "session3rd": userid,
      },
      success: function (res) {
        that.setData({
          cate: res.data.list
        })
      }
    })
  },
  getShopCart: function () {
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
  }
}))