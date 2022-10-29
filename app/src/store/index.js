import Vue from "vue";
import Vuex from 'vuex'
//需要使用vuex  vuex是vue的一个插件
Vue.use(Vuex)

//引入模块(小仓库)
import home from './home'
import search from './search'
import detail from './detail'

//对外暴露store类的一个实例
export default new Vuex.Store({
   modules:{
    home,
    search,
    detail
   }
})