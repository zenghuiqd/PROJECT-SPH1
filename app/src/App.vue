<template>
  <div>
    <MyHeader></MyHeader>
    <!-- 路由组件出口的地方  也就是路由组件显示的地方 -->
    <router-view></router-view>
    <!-- 在Home和Search显示  在登录或者注册隐藏 -->
    <MyFooter v-show="$route.meta.show"></MyFooter>
    </div>
</template>

<script>
//引入
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
export default {
  name:'App',
  components:{
    MyHeader,
    MyFooter
  },
  mounted(){
    //派发一个action  获取商品分类的三级列表的数据
    this.$store.dispatch('categorylist')
  }
}
</script>

<style scoped>

</style>
