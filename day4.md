复习:

1:开发search模块中的typenav商品分类菜单(过度动画效果)
过度动画:前提组件|元素务必要有v-if或者v-show指令才可以进行过度动画

2:对商品分类的三级列表进行优化?
  --原本 将类别请求放在typenav的mounted中  导致 home  search组件一重新加载就重新发请求   频繁请求效率过低   由于三级列表的数据是一定的 不会更改的
  --现在  可以将mounted请求 放在APP.vue文件中 因为APP.vue文件是根组件 只会执行一次  后面的组件谁用谁取即可  

3:合并params与puery参数

4:开发HomeS首页当中的ListContainer组件与floor组件
但是这里需要知道一件事情:服务器返回的数据只有商品分类菜单数据,对于ListContainer组件与floor组件数据服务器是没有提供的
mock数据(模拟):如果你想mock数据,需要用到一个插件mockjs(https://docschina.org/)

使用步骤:
1:在项目当中src文件夹中创建mock文件夹
2:准备json数据(mock文件夹中创建相应的json文件)----json文件一定要格式化一下 不要留有空格  不然是运行不起来的
3:把mock数据需要的图片放置到public文件夹中[public文件夹在打包的时候会吧相应的资源原封不动的打包到dist文件夹中]
4:创建mockServe.js通过mockjs模拟数据
5:mockServe.js文件再入口处引入(至少需要执行一次,才能模拟数据)

5: ListContainer组件开发重点?cnpm install --save swiper@5
安装swiper插件:最新版本是6  安装的是5版本 