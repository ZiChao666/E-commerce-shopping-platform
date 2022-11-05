import requests from './request.js'
import mockRequests from './mockRequest.js'

export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})

// 获取banner
export const reqGetBannerList = ()=>mockRequests.get('/banner')

// 获取floor
export const reqGetFloorList = ()=>mockRequests.get('/floor')

// 获取订单交易页面信息（虚拟）
export const reqOrdersInfo = ()=>mockRequests.get('/orderinfo')

// 获取搜索模块数据
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})

// 获取商品详情
export const reqGetGoodsInfo = (skuId)=>requests({url:`/item/${ skuId }`,method:'get'})

// 添加到购物车(对已有物品进行数量改动)
export const reqAddShopCartInfo = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})

// 获取购物车列表
export const reqGetShopCartList = ()=>requests({url:'/cart/cartList',method:'get'})

// 删除购物车某一项
export const reqDeleteShopCartSkuId = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 取消商品选中状态/cart/checkCart/{skuID}/{isChecked}
export const reqUncheck = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码
export const reqGetVerificationCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册/user/passport/register
export const reqGoRegister = (data)=>requests({url:'/user/passport/register',method:'post',data})

// 登录/user/passport/login
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',method:'post',data})

// 获取用户信息 /user/passport/auth/getUserInfo
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录 /user/passport/logout 
export const reqLogOut = ()=>requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息  /user/userAddress/auth/findUserAddressList
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页面的信息 /order/auth/trade
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

// 提交订单 /order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取支付信息 /payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付状态 /payment/weixin/createNative/{orderId}
export const reqPaystateu = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取个人中心列表 /order/auth/{page}/{limit}
export const reqMyOrder = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})


