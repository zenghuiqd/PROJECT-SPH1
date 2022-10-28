//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}


VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//第二步:暴露VueRouter类的实例
//对外暴露一个路由器,实质是VueRouter类的实例,一个路由器可以管理多个路由
export default new VueRouter({
  //配置路由
  routes: [
    {
      path: "/home",
      component: Home,
      meta: {
        show: true,
      },
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: Search,
      meta: {
        show: true
      },
      //路由组件能不能传递props参数
      //第一种:布尔值写法  只能传递params参数
      //  props:true,
      //第二种写法:对象写法:额外给路由组件传递一些props
      // props:{a:1,b:2}
      //第三种写法:函数写法:可以将params参数和query参数通过props传递给路由组件
      props: ($route) => {
      return {keyword: $route.params.keyword, k: $route.query.k};
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        show: false,
      },
    },
    {
      path: "/login",
      component: Login,
      meta: {
        show: false,
      },
    },

    //重定向,再项目跑起来的时候,访问/让他定向到首页
    {
      path: "*",
      redirect: "/home",
    },
  ],
});
