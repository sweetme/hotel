//index.js
//获取应用实例
const app = getApp()

Page(app.$CREATE_PAGE({
	data: {
		
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
	}
}))
