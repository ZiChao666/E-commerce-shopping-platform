import {reqUserLogin,reqUserInfo,reqLogOut} from '@/Api/index.js'
const Login = {
  namespaced: true,
  state:{
   token:localStorage.getItem('TOKEN'),
   userInfo:{}
  },
  actions:{
    // 登录业务
   async userLogin({commit},user){
    let result =  await reqUserLogin(user)
    // 服务器下发的token，用户唯一标识
    if(result.code==200){
      commit('USERLOGIN',result.data.token)
      // 持久存储token
      localStorage.setItem('TOKEN',result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
    
  },
  // 获取用户信息
  async getUserInfo({commit}){
    let result =  await  reqUserInfo()
    if(result.code==200){
     commit('GETUSERINFO',result.data)
    }
     },
    //  退出登录
   async logOut({commit}){
     let result = await reqLogOut()
     if(result.code==200){
      commit('LOGOUT')
      return 'ok'
     }else{
      return Promise.reject(new Error('faile'))
     }
    }
  },
  mutations:{
    USERLOGIN(state,token){
      state.token = token
    },
    GETUSERINFO(state,userInfo){
      state.userInfo = userInfo
    },
    LOGOUT(state){
      state.token = '',
      state.userInfo = {},
      localStorage.removeItem('TOKEN')
    }
  },
  getters:{}
}
export default{
  modules:{
    Login
  }
 }