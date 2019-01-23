//index.js
//获取应用实例
const app = getApp()

Page(app.$CREATE_PAGE({
  data: {
    id:"",
    videoSrc:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    isshowVideo:false,
    img:app.globalData.imgSrc,
    info:{
      banner: app.globalData.imgSrc + "demo.jpg",
      name: "澳大利亚进口澳大利亚进口澳大利亚进口澳大利亚进口澳大利亚进口澳大利亚进口澳大利亚进口澳大利亚进口澳大利亚进口澳大利亚进口澳大利亚进口",
      price: "698",
      currentPrice: "680.00",
      sellNum:"98",
      rating:"98%",
      certificate:["正品保证","隐私配送"],
      varieties: ["Bin2海外直采", "Bin2海外直采", "Bin2海外直采", "Bin2海外直采"],
      selectNum:"0",
      address:{province:"广东",city:"深圳市",country:"宝安区"},
      sellState:"现货",
      sellDistance:"1小时",
      param:{weight:"1.33kg"}
    },
    commentList: [
      { id: 2, avatar: app.globalData.imgSrc + "demo.jpg", commentName: "小白", commentDate: "2019.01.02", commentCon: "味道不錯,很赞", commentImgs: [{ url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }] },
      { id: 2, avatar: app.globalData.imgSrc + "demo.jpg", commentName: "小白", commentDate: "2019.01.02", commentCon: "味道不錯,很赞", commentImgs: [{ url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }, { url: app.globalData.imgSrc + "demo.jpg" }] }
    ],
    varietiesIndex:"0",
    currentSum:0,
    sum:0,
    disCount:0
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo');
  },
  onLoad: function (options) {
    if (options) {
      console.log(this.data.info)
      this.setData({
        id: options.id
      })
    }
     // this.initData(); //获取详情页数据
  },
  initData : function ( ) {
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
  varietiesSelect:function(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      varietiesIndex: index
    });
  },
  toFixed: function (num) {
    return parseFloat((num).toFixed(10))
  },
  addNum: function () {
    let info = this.data.info;
    info.selectNum++;
    this.setData({
      info: info,
    });
    this.countNum("add");
  },
  reduceNum: function () {
    let info = this.data.info;
    info.selectNum--;
    this.setData({
      info: info,
    });
    this.countNum("reduce");
  },
  countNum: function (type) {
    let info = this.data.info;
    let currentSum = 0;
    let sum = 0;
    let disCount = 0;
    if (info.selectNum > 0) {
      sum += this.toFixed(info.selectNum * info.price);
      currentSum += this.toFixed(info.selectNum * info.currentPrice);
    }
    disCount = this.toFixed(sum - currentSum);
    this.setData({
      sum: this.toFixed(sum),
      currentSum: this.toFixed(currentSum),
      disCount: this.toFixed(disCount)
    })
  },
  lower: function (e) { // 上拉加载
    console.log(e)
  },
  chooseAddress: function (e) { // 地址选择
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  showVideo: function (){
    this.setData({
      isshowVideo: true
    })
  },
  showImg: function () {
    this.setData({
      isshowVideo: false
    })
  },
  bindPlay: function () {
    this.showVideo();
    this.videoContext.play();
  },
  bindPause: function () {
    this.videoContext.pause();
  },
}))
