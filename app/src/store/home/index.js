//home模块
//引入接口函数
import { reqCategoryList, reqGetBannerList,reqGetFloorList } from "@/API";
//state、:仓库存储数据的地方
const state = {
  categorylist: [],
  bannerList: [],
  floorList:[]
};
//mutations:修改state的唯一手段
const mutations = {
  CATEGORYLIST(state, categorylist) {
    state.categorylist = categorylist;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
//actions:处理antion,可以自己书写自己的业务逻辑,还可以处理异步
const actions = {
  //通过API里面的接口函数调用,向服务器发请求,获取服务器的数据
  async categorylist({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  async getFloorList({ commit }) {
    let result = await reqGetFloorList();
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data);
    }
  },
};
//getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
const getters = {};

//对外暴露store类的一个实例
export default {
  state,
  actions,
  mutations,
  getters,
};
