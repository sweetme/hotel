// component/loading/loading.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentPage: {
      type: 'string',
      value: 'tabIndex'
    },
    data: {
      type: 'string',
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    info: [],
    currentIndex: '',
    isInfo:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add: function (event) { // 列表添加按钮
      let index = event.currentTarget.dataset.index
      let data = this.data.data;
      data[index].selectNum++;
      this.setData({
        data: data
      });
      this.count();
    },
    reduce: function (event) {// 列表减少按钮
      let index = event.currentTarget.dataset.index;
      let data = this.data.data;
      data[index].selectNum--;
      this.setData({
        data: data,
      });
      this.count();
    },
    count: function () { // 列表购物统计按钮
      let data = this.data.data;
      let currentSum = 0;
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].selectNum > 0) {
          sum += this.toFixed(data[i].selectNum * data[i].price);
          currentSum += this.toFixed(data[i].selectNum * data[i].currentPrice);
        }
      }
      this.setData({
        sum: this.toFixed(sum),
        currentSum: this.toFixed(currentSum)
      })
      if (this.data.isInfo) {
        this.setData({
          info: this.data.data[this.data.currentIndex]
        });
      }
      let datas = {};
      datas.sum = this.toFixed(sum);
      datas.currentSum = this.toFixed(currentSum);
      datas.info = this.data.data[this.data.currentIndex];
      datas.data = this.data.data;
      this.triggerEvent('count', datas);
    },
    toFixed: function (num) { //浮点数
      return parseFloat((num).toFixed(10))
    },
    goInfo: function (event) { // 获取详情信息
      let index = event.currentTarget.dataset.index;
      let data = this.data.data;
      let info = data[index];
      this.setData({
        isInfo: true,
        info: info,
        currentIndex: index
      })
      let datas = {};
      datas.info = info;
      datas.currentIndex = index;
      datas.currentPage = this.data.currentPage;
      datas.data = this.data.data;
      this.triggerEvent('detailTap', datas);
    },
    upLoad: function (e) { // 列表上拉加载
      this.triggerEvent('upLoad', e);
    },
  }
})
