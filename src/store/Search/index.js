import {reqGetSearchInfo} from '@/Api/index.js'
const Search = {
namespaced: true,

state : {
  searchList:{}
},
  
actions :{
 async getSearchInfo(context,params){
  let result =  await reqGetSearchInfo(params)
  if(result.code == 200){
    context.commit('GETSEARCHINFO',result.data)
   }
  }
},
  
mutations : {
  GETSEARCHINFO(state,searchList){
    state.searchList = searchList
  }
},
  
getters : {
  // 计算属性，作用是简化仓库的数据
  attrsList(state){
    // 这个后面加个空对象就是因为post传数据除开正常能传数据，其次就是必须是一个空，不然到时候服务器崩了，返回一个undefined，那这个页面的没了
    return state.searchList.attrsList||[]
  },
  trademarkList(state){
    return state.searchList.trademarkList||[]
  },
  goodsList(state){
    return state.searchList.goodsList||[]
  },
  total(state){
    return state.searchList.total||[]
  }
}
  
}
export default{
  modules:{
    Search
  }
}