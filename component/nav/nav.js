// component/loading/loading.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        currentPage: {
            type: 'string',
            value: 'tabIndex'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        nav: [// 导航栏配置
            {
                name: '首页',
                key: 'tabindex',
                image: '/images/nav-index-unchecked.png',
                currentImage: '/images/nav-index-checked.png',
                url: '/pages/tabindex/tabindex'
            }, {
                name: '酒店',
                key: 'tabhotel',
                image: '/images/nav-hotel-unchecked.png',
                currentImage: '/images/nav-hotel-checked.png',
                url: '/pages/tabhotel/tabhotel'
            }, {
                name: '美食',
                key: 'tabfood',
                image: '/images/nav-food-unchecked.png',
                currentImage: '/images/nav-food-checked.png',
                url: '/pages/tabfood/tabfood'
            }, {
                name: '商城',
                key: 'tabmall',
                image: '/images/nav-good-unchecked.png',
                currentImage: '/images/nav-good-checked.png',
                url: '/pages/tabmall/tabmall'
            }, {
                name: '个人中心',
                key: 'tabprofile',
                image: '/images/nav-personal-unchecked.png',
                currentImage: '/images/nav-personal-checked.png',
                url: '/pages/tabprofile/tabprofile'
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
