const router = new VueRouter({
    //此处可配置mode，默认为哈希-spa单页面跳转
    //页面首先分为两大块，上面和下面，并且在主页面一打开时，上下都有内容
    routes:[
        {
            //页面一打开，不仅上面的导航显示，下面的左右两部分分别显示不同的内容
            path:'/',
            component:Main,
            children:[
                {
                    path: '',
                    components: {
                        //left为router-view中的name标识，Left为组件名
                        left:Left,
                        right:Right
                    }
                }
            ]
        },
        {
            path:'/team',
            component:Team,
        }
    ]
});