import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)

//引入store
import store from '@/store'

// 先把VueRouter的原型对象的方法保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push和replace
// 第一个参数：告诉原先的push方法，往哪里跳转,第二个参数成功的回调，第三个参数是失败的回调
VueRouter.prototype.push=function(location, resolve, reject){
    if (resolve && reject) {
        originPush.call(this,location,resolve,reject)
     }else{
        originPush.call(this,location,() => {},() => {}) 
     }
}
VueRouter.prototype.replace=function(location, resolve, reject){
    if (resolve && reject) {
        originReplace.call(this,location,resolve,reject)
     }else{
        originReplace.call(this,location,() => {},() => {}) 
     }
}

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
   // 始终滚动到顶部
   return { y: 0 }
 },
})

// 全局前置守卫
router.beforeEach(async(to,from,next)=>{
const token = store.state.Login.Login.token
const name = store.state.Login.Login.userInfo.name
if (token) {
   //用户登录了,不能去login
   if (to.path == "/login") {
       next('/home');
   } else {
       //用户登陆了,而且还有用户信息【去的并非是login】
       if (name) {
           next();
       } else {
           //用户登陆了,但是没有用户信息 
           try {
               //发请求获取用户信息以后在放行
               await store.dispatch('Login/getUserInfo');
               next();
           } catch (error) {
               //用户没有信息，还携带token发请求获取用户信息【失败】
               //token【学生证失效了】
               //token失效:本地清空数据、服务器的token通知服务器清除
               await store.dispatch('Login/logout');
               //回到登录页，重新获取一个新的学生证
               next('/login');
           }
       }
   }
} else {
    // 未登录，不能去trade，pay，paysuccess，center
    let topath = to.path
    if(topath.indexOf('/trade') !=-1 || topath.indexOf('/pay') !=-1||topath.indexOf('/paysuccess') !=-1||topath.indexOf('/center') !=-1){
        // query传参，先把地址占位先，比如说点击我的订单，一登陆就是往我的订单跳转
        next('/login?redirect='+topath)
    }else{
        next()
    }
 }
})


export default router