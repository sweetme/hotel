## utils文件说明

### component - 全局可调用组件方法,使用时在json文件引入组件,然后wxml应用组件,并赋予id
* 全局信息提示: 在js中直接调用即可
* 全局弹窗: 显示弹窗 - app.$GETCTX('idSlector').handleShow(); 关闭弹窗 - app.$GETCTX('idSlector').handleClose()

### config - 全局配置存储位置,所以的全局配置都放到这个文件来

### main - 全局变量已经生命周期函数的位置

### tool - 全局的方法,包括post,get,上传图片以及时间戳的转换,如果项目中有超过使用两次以上的办法都存入此文件中,以便全局使用

## 每个js的创建都要修改,$CREATE_PAGE以防万一给每个页面添加中间件,处理业务,每个页面都要这样
* Page({}) 修改为 Page(app.$CREATE_PAGE({}))
