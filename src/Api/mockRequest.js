// 对axios进行二次封装
import axios from "axios";

// 引入进度条
import nprogress from "nprogress";
// 引入nprogress样式
import 'nprogress/nprogress.css'

// 利用axios对象的方法create，去创建一个axios实例
// request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发起请求的时候，路径中会出现api
  baseURL:"/mock",
  // 代表请求超时5秒
  timeout:5000
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
  // congig:配置对象，对象里面有一个属性很重要，header请求头
  nprogress.start()
  return config
})

// 响应拦截器：在返回数据之后，可以做些事
requests.interceptors.response.use((res)=>{
  nprogress.done()
  return res.data 
},(error)=>{
  return Promise.reject(new Error('faile'))
})

export default requests