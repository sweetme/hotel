//程序配置
import main from './utils/main.js';
//全局使用方法
import tool from './utils/tool.js';
//组件调用方法
import component from './utils/component.js';
//固定模块调用方法
import config from './utils/config.js';

const appConfig = Object.assign(main, tool, component, config);

//版本更新管理器
const updateManager = wx.getUpdateManager();

// 请求完新版本信息
updateManager.onCheckForUpdate(function (res) {
    console.log(res.hasUpdate)
})

//新版本准备好强制更新
updateManager.onUpdateReady(function () {
    wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，请点击确认重启应用!',
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
            }
        }
    })
})


// 注册小程序
App(appConfig)