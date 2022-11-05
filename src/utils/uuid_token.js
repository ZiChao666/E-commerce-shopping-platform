// 引入UUID的依赖包
import {v4  as  uuidv4 } from 'uuid'

// 生成一个随机字符串，且是持久存储的，每次执行不能更改
export const getUUID=()=>{
  // 先判断本地存储有没有UUID
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if(!uuid_token){
    // 生成一个游客身份
    uuid_token = uuidv4()
    // 存储到本地
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  return uuid_token
}