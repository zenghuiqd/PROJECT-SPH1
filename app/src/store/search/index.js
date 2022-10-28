//search模块
import { reqGetSearchInfo } from "@/API";
//state、:仓库存储数据的地方
const state = {
  searchList: {},
};
//mutations:修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
//actions:处理antion,可以自己书写自己的业务逻辑,还可以处理异步
const actions = {
  async getSearchList({ commit }, params={}) {
    const result = await reqGetSearchInfo(params);
    if(result.code == 200){
        commit("GETSEARCHLIST", result.data);
    }
  },
};
//getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
     //品牌的数据
     trademarkList(state) {
        return state.searchList.trademarkList;
   },
   //商品属性
   attrsList(state) {
        return state.searchList.attrsList;
   }
};

//对外暴露store类的一个实例
export default {
  state,
  actions,
  mutations,
  getters,
};
