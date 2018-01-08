//此处的‘Main’相当于HTML标签，经此实例化的对象才是路由所查找的对象
const Main = Vue.component('Main',{
    template:`<div class="main">
        <div class="container">
            <router-view name="left" class="left"></router-view>
            <router-view name="right" class="right"></router-view>
        </div>
    </div>`
});
const Left = Vue.component('Left',{
    data(){
         return{
              menu:[
              ]
         }
    },
    template:`
        <div> 
            <ul> 
                <li v-for="item in data">
                    <router-link :to="'#'+item.id">{{item.title}}</router-link>
                    <ul> 
                        <li v-for="item1 in item.childs">
                            <router-link :to="'#'+item1.id">{{item1.title}}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
    computed:{
        data(){
            var arr = [];
            for (var i in this.menu){
                if (this.menu[i].pid == 0){
                    var obj = this.menu[i];
                    arr.push(obj);
                }else{
                    for (var j in arr){
                        if (this.menu[i].pid == arr[j].id){
                            if (!arr[j].childs){
                                arr[j].childs = [];
                            }
                            arr[j].childs.push(this.menu[i]);
                        }
                    }
                }
            }
            return arr;
        }
    },
    mounted(){
        fetch('./json.txt').then(function (e) {
            return e.json();
        }).then(res=>{
            this.menu = res;
        })
    },
    watch:{
        $route(){
            var id = this.$route.hash.substr(this.$route.hash.indexOf('#')+1);
            //各个元素对应的高度  --滚动条的最终高度
            var tops = document.querySelector('.a'+id).offsetTop;

            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ tweeningNumber: 50 })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: tops }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.tweeningNumber.toFixed(0);
                })
                .start()

            animate()
        }
    }
});
const Right = Vue.component('Right',{
    data(){
        return{
            right:''
        }
    },
    template:`
        <div class="markdown-body">
            <div v-html="right">{{right}}</div>
        </div>
    `,
    mounted(){
        fetch('./md.txt').then(function (e) {
            return e.text();
        }).then(res=>{
            this.right = res;
        })
    }
});
const Team = Vue.component('Team',{
    template:`
        <div class="container"> 
            <div>teamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteam</div>
            <div>teamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteam</div>
            <div>teamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteam</div>
            <div>teamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteam</div>
            <div>teamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteam</div>
            <div>teamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteam</div>
            <div>teamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteam</div>
            <div>teamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteamteam</div>
        </div>
    `,
});