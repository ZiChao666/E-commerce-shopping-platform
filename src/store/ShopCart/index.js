import {reqGetShopCartList,reqAddShopCartInfo,reqDeleteShopCartSkuId,reqUncheck} from '@/Api/index.js'
const ShopCart = {
  namespaced: true,
  state : {
    shopCartList:[]
  },
 actions : {
  // 获取购物车列表数据
 async getShopCartList({commit}){
  let result =  await reqGetShopCartList()
  if(result.code==200){
    commit('GETSHOPCARTLIST',result.data)
  }
  },
  async addShopCartList({commit},{skuId,skuNum}){
    let result =  await reqAddShopCartInfo(skuId,skuNum)
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
   async deleteShopCartSkuId({commit},skuId){
    let result =  await reqDeleteShopCartSkuId(skuId)
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改单个商品的勾选状态
 async unchecked({commit},{skuId,isChecked}){
  let result = await reqUncheck(skuId,isChecked)
  if(result.code==200){
    return 'ok'
  }else{
    return Promise.reject(new Error('faile'))
   }
  },
  // 删除选中的商品
  deletePickShop({dispatch,getters}){
    // 获取购物车中全部产品（是一个数组）
    let PromiseAll = []
   getters.shopCartList.cartInfoList.forEach(item => {
  let promise =  item.isChecked==1? dispatch('deleteShopCartSkuId',item.skuId):''
    // 将每次返回的Promise添加到数组当中
   PromiseAll.push(promise)
   });
  //  只要全部成功，即为成功
  //  如果有一个失败，都失败
   return Promise.all(PromiseAll)
  },
  // 全选全部选中，取消全部取消
  selectAll({dispatch,state,getters},isChecked){
    let PromiseAll = []
    state.shopCartList[0].cartInfoList.forEach(item=>{
    let promise = dispatch('unchecked',{skuId:item.skuId,isChecked})
    PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },
  
 },
  
 mutations : {
  GETSHOPCARTLIST(state,shopCartList){
    state.shopCartList = shopCartList
  }
 },
 getters : {
  shopCartList(state){
    return state.shopCartList[0]||{}
  }
 }
}



export default{
 modules:{
  ShopCart 
 }
}