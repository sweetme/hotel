//index.js
//获取应用实例
const app = getApp()

Page(app.$CREATE_PAGE({
	data: {
		
	},
	//事件处理函数
	bindViewTap: function () {
		
	},
	onLoad: function () {
		app.$GETCTX('#modal').handleShow();
	},
	handleTest: function () {
		app.$Msg('111');
	},
	handleClose: function () {
		app.$GETCTX('#modal').handleClose();
	}
}))
