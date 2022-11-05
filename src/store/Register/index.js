import {reqGetVerificationCode,reqGoRegister} from '@/Api/index.js'
const Register = {
  namespaced: true,
  state:{
    code:''
  },
  actions:{
    // 获取验证码
  async  getVerificationCode({commit},phone){
   let result = await  reqGetVerificationCode(phone)
   if(result.code==200){
    commit('GETVERIFICATIONCODE',result.data)
    return 'ok'
   }else{
    return Promise.reject(new Error('faile'))
   }
    },
    // 用户注册
   async userRegister({commit},user){
    let result =  await reqGoRegister(user)
    console.log(result);
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
    }
  },
  mutations:{
    GETVERIFICATIONCODE(state,code){
     state.code = code
    }
  },
  getters:{}
}
export default{
  modules:{
    Register
  }
 }