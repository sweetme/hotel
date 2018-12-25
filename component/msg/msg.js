//消息提示
import util from '../../utils/config.js';

const app = getApp();
const MSG_QUEUE = new util.queue();

//消息进场通话
Component({
    data: {
        msgs:[],
        loading:{
            msg: "",
            time:2000,
            animation:{}
        },
    },
    ready(){
        MSG_QUEUE.endFunc = ()=>{
            this.setData({
                msgs:this.data.msgs
            })
        }
    },
    methods: {
        //显示提示
        handleShow(options){
            let route = app.$PWD(),
                idx = null;          
            MSG_QUEUE.Add(()=>{
                this.data.msgs.push(options);
                this.setData({
                    msgs:this.data.msgs
                },()=>{
                    MSG_QUEUE.Add(()=>{
                        idx = this.data.msgs.findIndex((e)=>(e.id == options.id))
                        this.setData({
                            [`msgs[${idx}].animation`]:util.animate.zoomIn
                        },()=>{
                            setTimeout(()=>{
                                idx = this.data.msgs.findIndex((e)=>(e.id == options.id))
                                this.setData({
                                    [`msgs[${idx}].animation`]:util.animate.zoomOut
                                },()=>{
                                setTimeout(()=>{
                                        MSG_QUEUE.Add(()=>{
                                            idx = this.data.msgs.findIndex((e)=>(e.id == options.id))
                                            this.data.msgs.splice(idx,1)
                                            return true;
                                        })
                                    },300) 
                                })
                            },options.time)
                        })
                        return false;
                    })
                })
                return false;  
            })
        },
        //开启加载提示
        handleLoading(msg,time){
            this.setData({
                loading:{
                    msg:msg,
                    time:time,
                    animation:util.animate.slideIn
                }
            })
        },
        //关闭提示
        handleCloseLoading(){
            this.setData({
                ['loading.animation']:util.animate.slideOut
            })
        }
    },
})