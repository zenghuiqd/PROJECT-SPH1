编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
--声明式导航是没有这类问题的,因为vue-router底层已经处理好了
1.1 为什么编程式导航进行路由跳转时,就有这种错误呢?
"vue-router":3.5.3版本,最新的vue-router引入了promise

1.2 第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

function push(){
    return new Promise(resolve,reject){

    }

}


2:将Home组件的静态组件拆分
---静态页面（样式）
---拆分静态组件
---发请求获取服务器数据进行展示
---开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件



3:三级联动组件完成
---由于三级联动,再Home,Seasrch,Detail都有使用,所以把三级联动组件注册为全局组件.
好处:只需要注册一次,就可以在项目任意地方使用  其他组件使用全局组件时不需要引入 直接使用即可

4:完成其他静态组件
html + css + 图片资源------信息[结构/样式/图片资源]

5:POSTMAN测试接口
==刚刚经过postman工具测试,接口是没有问题的
--如果服务器返回的数据code字200,代表服务器返回数据成功
--整个项目,借口前缀都有/api字段

6:axios二次封装
XMLhttpRequest,fetch,JQ,axios

6.1:为什么需要二次封装axios?
请求拦截器:可以在发请求之前处理一些业务
响应拦截器:当服务器返回之后,可以处理一些业务

6.2:在项目当中经常出现API文件【用来放axios请求】
6.3:axios基础不好的同学可以参考git/NPM关于axios文档
直接百度搜索axios文档即可



7:接口统一管理
 
 项目很小:完全可以在组件的声明周期函数中发请求

 项目很大:

7.1:跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
http://127.0.0.1:8080/#/home---前端项目本地服务器
http://39.98.123.211        ---后台服务器

解决方案:JSONP、CROS、代理


8:nprogress进度条的使用:start方法和done方法的使用(在request.js查看相关代码)

9:vuex状态管理库

9.1:Vuex是什么?

vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
由于项目体积比较大，你向服务器发请求的接口过多，服务器返回的数据也会很多，如果还用以前的方式存储数据，导致vuex中的state数据格式比较复杂。采用vuex模块式管理数据。

Vuex核心概念:state、actions、mutations、getters、modules

9.2:Vuex基本使用

9.3:模块式开发
{
    state:{
        home:{a:1},
        search:{},
        detail:{}
    }
}