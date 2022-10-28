//对于axios进行二次封装
//引入axios
import axios from "axios";
//引入进度条  start方法:进度条开始  done方法:进度条结束
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
//axios.create方法执行,其实返回一个axios和request一样的
let requests = axios.create({
  //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
  baseURL: "/api",
  //超时的设置
  timeout: 5000,
});

//请求拦截器:将来项目中【N个请求】，只要发请求,会触发请求拦截器!!!
requests.interceptors.request.use((config) => {
  //config配置对象,对象里面有一个属性很重要,header请求头
  //进度条开始动
  nprogress.start();
  return config;
});

//响应拦截器：请求数据返回会执行
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数:服务器相应数据回来以后,相应拦截器可以检测到,可以做一些事情
    //进度条jeishu
    nprogress.done();
    return res.data;
  },
  (error) => {
    //响应失败的回调
    return Promise.reject(new Error("faile"));
  }
);

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
export default requests;
