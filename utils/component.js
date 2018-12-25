// 可调用组件方法

let msgConfig = {
    msg: '',
    animation:{},
    msgType: 'default',
    time: 2000
}

let msgId = 0;

export default {
    /**
     * 消息提示
     *
     * @options 选项 如果为string,就是消息内容
     * @@msg 消息内容
     * @@msgType default 黑框白字 success 绿框白字 error 红框白字 info 蓝框白字 warn 黄框白字 loading 正方形白底loading图标 默认为default
     * @@time 显示时间
     *
     */
    $Msg(options) {
        const ctx = this.$GETCTX('#msg');
        let config;
        if (typeof options == 'string') {
            config = Object.assign({}, msgConfig, {
                msg: options
            })
        } else {
            config = Object.assign({}, msgConfig, options)
        }
        config.id = msgId;
        msgId++;
        return new Promise((resolve) => {
            ctx.handleShow(config)
            setTimeout(function () {
                resolve();
            }, config.time)
        });
    },
    $MsgError(msg, time = 2000) {
        return this.$Msg({
            msg: msg,
            time: time,
            msgType: 'error'
        });
    },

    $MsgSuccess(msg, time = 2000) {
        return this.$Msg({
            msg: msg,
            time: time,
            msgType: 'success'
        });
    },
    $MsgInfo(msg, time = 2000) {
        return this.$Msg({
            msg: msg,
            time: time,
            msgType: 'info'
        });
    },
    $MsgWarn(msg, time = 2000) {
        return this.$Msg({
            msg: msg,
            time: time,
            msgType: 'warn'
        });
    },
    $MsgCloseLoading(){
        const ctx = this.$GETCTX('#msg');
        return ctx.handleCloseLoading();
    }
}