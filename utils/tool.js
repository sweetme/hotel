export default {
    /**
     * 获取对应的模块
     *
     */
    $GETCTX(selector) {
        const componentCtx = this.$PAGE().selectComponent(selector);

        if (!componentCtx) {
            console.error('无法找到对应的组件，请按文档说明使用组件');
            return null;
        }
        return componentCtx;
    },
    /**
     * 返回当前页面
     */
    $PAGE(idx) {
        const pages = getCurrentPages();
        return pages[pages.length - (typeof idx == 'number' ? idx : 1)];
    },
    /**
     * 返回当前页面路径
     */
    $PWD() {
        return this.$PAGE().route;
    },
    /**
     * 时间格式化
     *
     * @param {number} time - 时间
     * @param {funciton} func 如果为函数 进一步自定义处理 否则为字符串格式 默认'Y-n-j H-i-s'
     */
    $TIMEFORMAT(time, func) {
        if (!time) {
            return '暂无'
        }
        let format = 'Y-n-j H:i:s';

        let timeObj = new Date(time * 1000);

        let timeData = {
            year: timeObj.getFullYear(),
            month: timeObj.getMonth(),
            day: timeObj.getDate(),
            hour: timeObj.getHours(),
            minute: timeObj.getMinutes(),
            second: timeObj.getSeconds(),
        }

        if (typeof func != "function") {
            format = func
            let timeFmt = format
                .replace('Y', timeData.year)
                .replace('n', timeData.month + 1)
                .replace('j', timeData.day > 9 ? timeData.day : '0' + timeData.day)
                .replace('H', timeData.hour > 9 ? timeData.hour : '0' + timeData.hour)
                .replace('i', timeData.minute > 9 ? timeData.minute : '0' + timeData.minute)
                .replace('s', timeData.second > 9 ? timeData.second : '0' + timeData.second);
            return timeFmt;
        } else {
            return func(timeData);
        }
    },
    /**
     * GET请求
     *
     * @param {string} url - 地址
     * @param {object} data - 参数
     */
    $GET(url, data) {
        let d = {// 固定上传数据

        }
        d = Object.assign(d, data);
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.env.baseUrl + url,
                data: d,
                method: 'GET',
                success: (resp) => {
                    if (resp.data.error_code == 0) {// 成功情况
                        resolve(resp.data);
                    } else if (resp.data.error_code == -9 || resp.data.error_code == -8) {
                        // 登陆过期判断
                    } else {// 失败情况
                        reject(resp.data);
                    }
                },
                fail: (err) => {
                    this.$ERROR();
                }
            })
        })
    },
    /**
     * POST请求
     *
     * @param {string} url - 地址
     * @param {object} data - 参数
    */
    $POST(url, data, type) {
        let d = {
            token: wx.getStorageSync('token') || '',
            request_agent: 'wechat'
        };
        d = Object.assign(d, data);
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.env.baseUrl + url,
                data: d,
                method: 'POST',
                success: (resp) => {
                    if (resp.data.error_code == 0 || resp.data.error_code == 47000) {
                        resolve(resp.data);
                    } else if (resp.data.error_code == -9 || resp.data.error_code == -8) {

                    } else {
                        reject(resp.data);
                    }
                },
                fail: (err) => {
                    this.$ERROR();
                }
            })
        })
    },
    /**
     * 上传图片
     * @param {number} count - 规定上传总数
     * @param {string} sourceType - album 从相册选图，camera 使用相机，默认二者都有
     */
    $FILE(count, sourceType) {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                sizeType: ['original', 'compressed'],
                sourceType: sourceType ? sourceType : ['album', 'camera'],
                count: count ? count : 9,
                success: (res) => {
                    if (res.tempFilePaths.length <= 0) {
                        return false;
                    }
                    let data = {// 固定上传参数
                    }
                    let plist = []
                    res.tempFilePaths.map((e) => {
                        plist.push(new Promise((resolve) => {
                            wx.uploadFile({
                                url: wx.getStorageSync('uploadUrl'),
                                filePath: e,
                                name: 'file',
                                formData: data,
                                success: (resp) => {
                                    let res = JSON.parse(resp.data);
                                    res.error ? reject(res) : resolve(res);
                                }
                            })
                        }).then((data) => {
                            return data.key;
                        }).catch((err) => {
                            reject(err);
                        }))
                    })
                    Promise.all(plist).then((imgs) => {
                        resolve(imgs);
                    })
                },
                fail: (err) => {
                    reject(err);
                }
            })
        })
    },
    /**
    * 系统错误提示
    *
    * @param {string} t 错误提示
    */
    $ERROR(t) {
        wx.showToast({
            title: t && typeof t == 'string' ? t : '网络错误',
            image: '/src/img/net_error.png',
            duration: 3000
        })
    },
    /**
     * 包装创建页面配置
     * 方便控制全局
     * @param { Object } config - json格式页面配置
    */
    $CREATE_PAGE(config = {}) {
        return Object.assign({
            //分享
            onShareAppMessage: () => {
                return this.$SHARECONFIG();
            }
        }, config);
    },
}