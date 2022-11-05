import {reqGetGoodsInfo,reqAddShopCartInfo} from '@/Api/index.js'
// 生成一个游客id，且是持久的，不能更改的
import { getUUID } from '@/utils/uuid_token'
const Detail = {
  namespaced: true,
  state:{
    goodsInfo:{},
    uuid_token:getUUID()
  },
  actions:{
   async getGoodsInfo(context,skuId){
   let result =  await  reqGetGoodsInfo(skuId)
   if(result.code==200){
    context.commit('GETGOODSINFO',result.data)
   }
    },
    // 添加到购物车(对已有物品进行数量改动)
   async getShopCart({commit},{skuId,skuNum}){
    let result =  await reqAddShopCartInfo(skuId,skuNum)
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
    }
  },
  mutations:{
    GETGOODSINFO(state,goodsInfo){
      state.goodsInfo = goodsInfo
    }
  },
  getters : {
    categoryView(state){
      return state.goodsInfo.categoryView||{}
    },
    skuInfo(state){
      return state.goodsInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
      return state.goodsInfo.spuSaleAttrList||[]
    }

  }
}
export default  {
  modules:{
    Detail
  }
}