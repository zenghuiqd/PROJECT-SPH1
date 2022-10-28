1:使用vue-cli脚手架初始化项目
   node+webpack+淘宝镜像

node_modules文件夹:放置的是项目依赖


public文件夹:一般放置一些静态资源 比如图片,需要注意,放在public文件夹中的静态资源,webpack进行打包的时候会原封不动打包到dist文件夹中


src文件夹(程序员源代码文件夹):
        assets文件夹:一般也是放置静态资源(一般放置多个组件公用的静态资源),需要注意,放置在saaets文件夹里面的静态资源,再webpack打包的时候,webpack会把静态资源当做一个木块,打包到js文件里面

        components文件夹:一般方式的是非路由自检(全局组件)

        APP.vue:全局唯一一个的根组件,Vue当中的组件(.vue)
        main.js:程序的入口文件,也是整个程序当中最先执行的文件

babel.config.js配置文件(babel相关),一般不会去碰

package.json文件:认为项目'身份证,记录项目就叫做什么/项目当中有哪些依赖,项目怎么运行

package-lock.jaon文件:缓存性文件

README.md文件:说明性的文件





2:项目的其他配置

2.1项目运行起来的时候,让浏览器自动打开
---package.json
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },




2.2eslint校验功能关闭  
---在根目录下,创建一个vue.config.js文件


2.3src文件名简写方法,配置别名.@
【@代表的是src文件加,这样将来文件过多,找的时候方便很多】


3:项目路由的分析
vue-router
前端所谓路由:kv键值对.
key:url(地址栏中的路径)
value:相应的路由组件
注意:项目是上中下结构

路由组件:
Home首页路由组件,Search路由组件,login登录路由,Redister注册路由

非路由组件:
Header头部组件:【首页,搜索页】
Footrer底部组件: 【首页,搜索页】但是在登录页面和注册页面是没有的



4: 完成非路由组件Header和Footrer组件
在咱们项目中,不再以HTML+CSS为主,主要搞业务和逻辑
再开发项目的时候:
1:书写静态页面(HTML+CSS)
2:拆分组件
3:获取服务器的数据动态展示
4:完成相应的动态业务逻辑


注意1:创建组件的时候,组件结构+组建的样式+图片的资源
注意2:咱们项目采用的是less样式,浏览器不识别less样式,需要通过less,less-loader(安装5版本)进行处理less,吧less样式变为css样式,浏览器才可以识别
注意3:如果想让组件识别less样式,需要再style标签的身上加上lang='less'


4.1使用组件的步骤(非路由组件)
-创建或者定义组件
-引入
-注册
-使用


5:路由组件的搭建
暂停服务期后安装vue-router   vue2需要搭配vue-router的3版本使用
在上面分析 路由组件应该有4个:Home,Search,Login,Register
-components文件夹:经常放置非路由组件(共用全局组件)
-pages/views文件夹:经常放置路由组件


5.1配置路由
项目当中配置的路由一般放置在router文件中
配置完之后要去main.js里引入与注册

------路由组件
     -----router--->index.js
                  import Vue  from 'vue';
                  import VueRouter from 'vue-router';
                  //使用插件
                  Vue.use(VueRouter);
                  //对外暴露VueRouter类的实例
                  export default new VueRouter({
                       routes:[
                            {
                                 path:'/home',
                                 component:Home
                            }
                       ]
                  })
    ------main.js   配置项不能瞎写

5.2总结
路由组件与非路由组件的区别?
1:路由组件一般是放置在pages/views文件夹中,非路由组件一般放置在components文件夹中
2:路由组件一般需要在router文件夹中进行注册(使用的即为组件的名字)
非路由组件在使用的时候,一般都是以 标签的形式使用
3:注册完路由,不管是路由组件还是非路由组件身上都有$route和$router属性

$route:一般用来获取路由信息【路径,query,params等等】
$router:一般进行编程时导航进行路由跳转【push/replace】


5.3:路由的跳转?
路由跳转有两种方式:
声明式导航router-link
编程式导航$route.push|replace

编程式导航:声明式导航能做的,编程式都能做,但是编程式导航除了可以进行路由跳转,还可以做一些其他的业务逻辑


6:Footer组件显示与隐藏
显示与隐藏组件:v-if|v-show

Footer组件:在Home.Search组件中显示Footer组件
           在登录,注册时候隐藏Footer组件

6.1:我们可以根据组件身上的$route获取当前陆游的信息,通过路由的路径判断Footer显示与隐藏
6.2:配置路由的时候,可以给路由添加路由元信息【meta】,路由需要配置对象,它的key不能瞎写,胡写,乱写


8:路由传参

8.1:路由传参,参数有几种写法?
params参数:属于路径当中的一部分,需要注意,再配置路由的时候需要占位
query参数:不属于路径当中的一部分,类似于ajax中的queryString   /home?k=v&kv=,不需要占位

9:路由传参相关面试题
9.1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
     不可以：不能这样书写，程序会崩掉

9.2:如何指定params参数可传可不传? 
比如:配置路由的时候,占位了params参数,但是传递的时候就不传递,路径会出现问题
答案:在配置理由的时候,在占位的后面加上一个问号,代表params参数可传可不传

9.3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
答案:使用undfined解决:params参数可以传递也可以不传递(空字符串)
this.$router.push({name:'search',params:{keyword:''||undefined} })

9.4:如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题

9.5: 路由组件能不能传递props数据?
  可以的 并且有三种方式