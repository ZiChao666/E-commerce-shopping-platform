import {reqCategoryList,reqGetBannerList,reqGetFloorList} from '@/Api/index.js'
const Home = {
  namespaced: true,
  state : {
    
     // state中的初始值别乱写，服务器返回的是对象就写对象，数组就写数组
    categoryList:[],
    bannerList:[],
    floorList:[],
    // userInfo:{}
  },
 actions : {
    // 通过api里面的接口，向服务器发起请求获取数据
    async categoryList(context){
    let result = await reqCategoryList()
    if(result.code === 200){
      context.commit('CATEGORYLIST',result.data)
      
      }
    },
    async getBannerList(context){
      let result = await reqGetBannerList()
      if(result.code === 200){
        context.commit('GETBANNERLIST',result.data)
        
        }
      },
      async getFloorList(context){
        let result = await reqGetFloorList()
        if(result.code === 200){
          context.commit('GETFLOORLIST',result.data)
          // console.log(result.data);
          }
        },
        // 获取用户信息
      //  async getUserInfo({commit}){
      //  let result =  await  reqUserInfo()
      //  if(result.code==200){
      //   commit('GETUSERINFO',result.data)
      //  }
      //   }
    
  },
  
 mutations : {
    CATEGORYLIST(state,List){
      state.categoryList = List.slice(0,16)
    },
    GETBANNERLIST(state,bannerList){
      state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
      state.floorList = floorList
    },
    // GETUSERINFO(state,userInfo){
    //   state.userInfo = userInfo
    // }
  },
 getters : {}
}



export default{
 modules:{
  Home 
 }
}