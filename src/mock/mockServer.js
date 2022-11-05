import Mock from 'mockjs'

// 因为json是默认暴露的，所以json文件内也没有暴露文件的操作
import banner from './banner.json'
import floor from './floor.json'
import orderinfo from './orderinfo.json'

// mock数据：第一个参数请求地址，第二个参数：请求失败
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
Mock.mock("/mock/orderinfo",{code:200,data:orderinfo})