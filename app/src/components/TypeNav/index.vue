<template>
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派|事件委托 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 利用事件委派+编程式导航实现陆游的跳转与传递 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 一级分类 -->
                            <div class="item" v-for="(c1,index) in categorylist" :key="c1.categoryId"
                                :class="{cur:currentIndex == index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                                    <!-- 二级分类 -->
                                    <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <!-- 三级分类 -->
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>

                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
//引入方式:是把lodash的全部功能函数引入
// import _ from 'lodash'
//最好的方式是按需引入  因为throttle是默认暴露 所以引入的时候不需要加{}
import throttle from "lodash/throttle"
export default {
    name: "TypeNav",
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    //组件挂载完毕:可以向服务器发送请求
    mounted() {
        //通知vuex发请求,获取数据,存储于仓库当中(派发actions)
        
        if (this.$route.path != '/home') {
            this.show = false;
        }
    },
    computed: {
        ...mapState({
            //右侧需要的是一个函数,当使用这个计算属性的时候,右侧函数就会立即执行一次
            //注入一个参数state,其实即为大仓库中的数据
            categorylist: state => state.home.categorylist
        })
    },
    methods: {
        //鼠标进入修改响应式数据currentIndex的值
        // changeIndex(index) {
        //index:鼠标移上某一个一级分类的元素的索引值
        //正常情况(用户慢慢操作):鼠标进入,每一个一级分类h3,都会出发鼠标进入事件
        //非正常情况(用户操作很快:本身全部的一级分类都应该出发鼠标进入事件,但是经过测试,只有部分h3触发了
        //就是由于用户行为过快,导致浏览器反应不过来,如果当前回调函数中有一些大量业务,有可能出现卡顿现象
        //     this.currentIndex = index;
        // },
        //throttle函数不要用箭头函数  可能出现上下文this错误
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        // 一级分类鼠标移除的事件回调
        leaveShow() {
            this.currentIndex = -1;
            //判断如果不是home页面  移除鼠标将一级分类隐藏
            if (this.$route.path != '/home') {
                this.show = false;
            }
        },
        //精益求精
        //将全部的子节点的事件委派给父节点->事件回调就一个
        goSearch(event) {
            //第一个问题:div父节点子元素太多【h3、h2、em、dt、dd、dl...a】？你怎么知道你点击的一定是a
            //第二个问题:要区分一级分类、二级分类、三级分类的a标签【category1Id|category2Id|category2Id】
            let targetNode = event.target;
            //获取触发事件节点的自定义属性【a:data-categoryName】
            let { categoryname, category1id, category2id, category3id } =
                targetNode.dataset;
            //判断点击的是a【不管是1|2|3】
            if (categoryname) {
                //点击只要是a,就是往search模块跳转
                var locations = { name: "search" }
                let query = { categoryName: categoryname }

                //一级分类的a
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    //二级分类的a
                    query.category2Id = category2id;
                } else {
                    //三级分类的a
                    query.category3Id = category3id;
                }
                //整理完参数
                //如果路由的时候,带有params参数  也要传过去
                if(this.$route.params){
                    locations.params =this.$route.params
                }
               //动态给locations添加query属性
                locations.query = query;
                //目前商品分类这里携带参数只有query参数
                this.$router.push(locations);
            }
        },
        enterShow() {
            this.show = true;
        }

    },
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 28px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }

        //过渡动画开始的状态
        .sort-enter {
            height: 0px;
        }

        //定义动画时间,速率
        .sort-enter-active {
            transition: all .5s linear;
        }

        //过渡动画结束的状态
        .sort-enter-to {
            height: 461px;
        }
    }
}
</style>