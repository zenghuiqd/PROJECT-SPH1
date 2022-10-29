//引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from '@/pages/Detail';
export default [
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
      {
        path: "/detail/:skuid",
        component: Detail,
        meta: {
          show: false,
        },
      }
]