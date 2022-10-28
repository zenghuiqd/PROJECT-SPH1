//当前这个模块,API接口进行统一管理
import requests from "./request";
import mockRuests from './mockAjax';

//三级联动接口
///api/product/getBaseCategoryList  get 无参数
//发请求:axios发请求 返回的是promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
//获取banner数据
export const reqGetBannerList= ()=>mockRuests({url:'/banner',method:'get'})
//获取floor数据
export const reqGetFloorList= ()=>mockRuests({url:'/floor',method:'get'})
// 获取收货模块数据  /api/list  post  参数:需要带参数
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})


