import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

// 引入仓库
import store from '@/store'

// 三级联动组件引入
import TypeNav from '@/components/TypeNav/TypeNav.vue'
Vue.component('TypeNav',TypeNav)

// 全局引入轮播图组件
import Carousel from '@/components/Carousel/Carousel.vue'
Vue.component('Carousel',Carousel)

// 分页器
import Pagination from '@/components/Pagination/Pagination.vue'
Vue.component('Pagination',Pagination)

Vue.config.productionTip = false

import '@/mock/mockServer.js'

// 局部引入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局引入swiper样式
import 'swiper/dist/css/swiper.css'

import gif from '@/assets/images/R-C.gif'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{loading: gif})
 
// 全局引入接口api，统一引入
import * as API from '@/Api'

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  store,
  router, 
  render: h => h(App),
}).$mount('#app')
