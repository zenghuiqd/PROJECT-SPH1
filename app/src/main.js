import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//引入分页器组件---全局组件
import Pagination from '@/components/Pagination'
//注册全局组件 第一个参数:全局组件的名字name,第二个参数:哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Pagination.name,Pagination);

//引入mockServe.js---mock数据
import '@/mock/mockServe';
//引入swiper样式
import 'swiper/css/swiper.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  },
  //注册路由:底下的写法kv一致 省略v
  //注册路由信息:当这里书写router的时候,组件身上都拥有了$route和$router属性
  router,
  //注册仓库:组件实例身上会多了一个$store属性
  store
}).$mount('#app')
