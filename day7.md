1:很多电商平台为什么需要用分页?
分页功能实现
一页展示太多数据 加载太慢    比如电商平台展示的数据有很多(1000+) 所以采用分页功能
ElementUI是有相应的分页组件,使用起来超级简单,但是咱们前台项目先不用

分页器需要拆出作为全局组件去使用Pagination

2:分页器的展示需要哪些数据?
--需要知道当前是第几页:pageNo字段代表当前页数
--需要知道每一页展示多少数据:pageSize字段进行代表
--需要知道一共有多少数据:total字段进行代表  [获取一条信息:一共多少页]
--需要知道分页器连续页面个数:一般是5/7 [奇数]  为了对称

-----总结:对于分页器而言,自定义前提需要知道四个前提条件
pageNo:当前第几页
pageSize:代表每一页展示多少数据
total:代表整个分页一共要展示多少条数据
continues:代表分页连续页码个数


举例子:每一页3条数据  一共90条数据  [一共是30页]
    每一页3条数据  一共90条数据  [一共是31页]

3:自定义分页器: 在开发的时候先自己传递假的数据进行调试,调试成功以后再用服务器数据

4:对于分页器而言,很重要的一个地方即为[算出:连续页面起始数字和结束数字]

5:分页器动态展示?分为上中下
v-for也是可以遍历数字number的