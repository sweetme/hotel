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
    shopCart: [],
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
  initData: function () { // 数据初始化
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
  count:function(datas) { //获取组件传递的购物车统计
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
    if (info) { //美食详情
      this.setData({
        info: info
      });
    }
  },
  countNum: function(type) { // 详情页触发购物车统计
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
  toFixed: function (num){ //浮点数取值
    return parseFloat((num).toFixed(10))
  },
  close: function (){ //关闭美食详情
    this.setData({
      isInfo: false
    })
  },
  addNum: function() { // 详情页添加按钮
    let data = this.data.data;
    data[this.data.currentIndex].selectNum++;
    this.setData({
      data: data,
    });
    this.countNum();
  },
  reduceNum: function () {// 详情页减少按钮
    let data = this.data.data;
    data[this.data.currentIndex].selectNum--;
    this.setData({
      data: data,
    });
    this.countNum();
  },
  lower: function (e) { // 列表上拉加载
    console.log(e)
  },
  loadComment: function (e) { // 评论上拉加载
    console.log(e)
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
    // console.log(cart);
  },
  detailTap: function (datas) { //详情页弹窗
    let data = datas.detail;
    this.setData({
      isInfo: true,
      info: data.info,
      currentIndex: data.currentIndex,
      data: data.data
    })
  },
  upLoad: function () {//上拉加载列表
    // console.log("upLoad")
  },
  loadComment: function () { //上拉加载评论
    // console.log("loadComment")
  }
}))