import AddCartSuccess from '@/pagas/AddCartSuccess/index.vue'
import ShopCart from '@/pagas/ShopCart/ShpCart.vue'
import Trade from '@/pagas/Trade/Trade.vue'
import Pay from '@/pagas/Pay/Pay.vue'
import PaySuccess from '@/pagas/PaySuccess/index.vue'
import Center from '@/pagas/Center/index.vue'
// 二级路由
import groupOrder from '@/pagas/Center/groupOrder/groupOrder.vue'
import myOrder from '@/pagas/Center/myOrder/myOrder.vue'

export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: ()=>import('@/pagas/Home/Home.vue'), meta: { show: true } },
  { path: '/search/:keyword?', component: ()=>import('@/pagas/Search/Search.vue'), meta: { show: true }, name: 'search' },
  { path: '/login', component:()=>import('@/pagas/Login/Login'), meta: { show: false } },
  { path: '/register', component: ()=>import('@/pagas/Register/Register'), meta: { show: false } },
  { path: '/detail/:skuId', component: ()=>import('@/pagas/Detail/Detail'), meta: { show: true } },
  { path: '/addcartsuccess', component: AddCartSuccess, meta: { show: true }, name: 'addcartsuccess' },
  { path: '/shopcart', component: ShopCart, meta: { show: true } },
  { path: '/trade', component: Trade, meta: { show: true },
  beforeEnter:(to, from, next) => { 
    if(from.path=='/shopcart'){
      next()
    }else{
      next(false)
    }
  } },
  { path: '/Pay', component: Pay, meta: { show: true } ,
  beforeEnter:(to, from, next)=>{
    if(from.path=='/trade'){
      next()
    }else{
      next(false)
    }
  }},
  { path: '/paysuccess', component: PaySuccess, meta: { show: true },
  beforeEnter:(to, from, next)=>{
    if(from.path=='/Pay'){
      next()
    }else{
      next(false)
    }
  } },
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    
    // 重定向路由
    redirect:'/center/myorder',
    // 二级路由
    children: [
      { path: 'myorder', component: myOrder },
      { path: 'grouporder', component: groupOrder }
    ]
  }
]
