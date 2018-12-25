const animation = wx.createAnimation()

export default {
    //环境参数配合
    env: {
        pro: {
            baseUrl: "https://api.7799520.com"
        },
        dev: {
            baseUrl: 'http://testapi.myhoney520.com'
        }
    },
    //动画配置
    animate: {
        zoomIn: animation.opacity(1).scale3d(1, 1, 1).step({ duration: 300 }).export(),
        zoomOut: animation.opacity(0).scale3d(2, 2, 2).step({ duration: 300 }).export(),
        slideIn: animation.opacity(1).scale3d(1, 1, 1).translate3d(0, 0, 0).step({ duration: 300 }).export(),
        slideOut: animation.opacity(0).scale3d(1, 1, 1).translate3d(0, 50, 0).step({ duration: 300 }).export()
    },
    //队列处理
    queue: class {
        constructor(endFunc) {
            this.imHandleGenther = [];
            this.imHandleStop = false;
            this.endStop = undefined;
            this.endFunc = endFunc;
        }

        Add(obj) {
            this.imHandleGenther.unshift(obj);
            if (!this.imHandleStop) {
                this.imHandleStop = true;
                this.Run();
            }
        }

        Run() {
            if (!this.imHandleStop) {
                return;
            }
            setTimeout(() => {

                this.endStop = this.imHandleGenther.pop()();

                if (this.imHandleGenther.length) {
                    this.Run();
                } else {
                    this.imHandleStop = false;
                    this.endFunc ? (typeof this.endStop == 'undefined' ? this.endFunc() : (this.endStop ? this.endFunc() : null)) : null;
                }
            })
        }
    }
};