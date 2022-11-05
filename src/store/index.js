// 导入Vue
import Vue from 'vue'

// 导入Vuex
import Vuex from 'vuex'

// 安装Vux插件
Vue.use(Vuex)

// 引入小仓库
import Home from '@/store/Home'
import Search from '@/store/Search'
import Detail from '@/store/Detail'
import ShopCart from '@/store/ShopCart'
import Register from '@/store/Register'
import Login from '@/store/Login'
import Trade from '@/store/Trade'

// 创建store
export default new Vuex.Store({
  modules:{
    Home,
    Search,
    Detail,
    ShopCart,
    Register,
    Login,
    Trade
  }
})