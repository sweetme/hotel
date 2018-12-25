let modelTimer = null;
Component({
    externalClasses: ['custom-class'],
    properties: {
        Background: {
            type: String,
            value: '#000000'
        },
        Layout: {
            type: String,
            value: 'table'
        },
        shadeClose: {
            type: Boolean,
            value: false
        }
    },
    data: {
        xClass: ''
    },
    methods: {
        //显示
        handleShow() {
            this.setData({
                xClass: 'show',
            })
            clearTimeout(modelTimer);
        },
        //隐藏
        handleClose() {
            this.setData({
                xClass: 'out'
            })
            modelTimer = setTimeout(() => {
                this.setData({
                    xClass: ''
                })
            }, 450)
        }
    }
})