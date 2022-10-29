import { reqGoodsInfo } from "@/API";
const state = {
  goodInfo: {},
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
};
const getters = {
    //路径导航简化的数据
    categoryView(state){
        return state.goodInfo.categoryView|| {}    
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo|| {}    
        
    },
    //简化产品售卖属性的数据
    spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList|| [] 
    },
}

export default {
  state,
  mutations,
  actions,
  getters,
};
