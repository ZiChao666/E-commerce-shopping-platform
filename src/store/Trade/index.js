import {reqAddressInfo,reqOrdersInfo,reqOrderInfo} from '@/Api/index.js'
const state = {
  ordersInfo:{},
  orderInfo:{}
}
const actions = {
  // 获取地址
 async getOrdersInfo({commit}){
  let result = await reqOrdersInfo()
  if(result.code==200){
    commit('GETORDERSINFO',result.data)
    }
  },
  // 获取订单交易页面信息
 async getOrderInfo({commit}){
  let result = await reqOrderInfo()
  if(result.code==200){
    commit('GETODERINFO',result.data)
  }
}

}
const mutations = {
  GETORDERSINFO(state,ordersInfo){
    state.ordersInfo = ordersInfo||{}
  },
  GETODERINFO(state,orderInfo){
    state.orderInfo = orderInfo
  }
}
const getters = {
  detailArrayList(state){
    return state.ordersInfo.data.detailArrayList||[]
  },
  userAddressList(state){
    return state.ordersInfo.data.userAddressList||[]
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}