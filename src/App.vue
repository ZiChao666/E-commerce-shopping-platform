<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  name: 'App',
  components: { Header, Footer },
  created() {
    // app根组件的钩子只执行一次
    this.$store.dispatch('Home/categoryList')
  }
}
</script>

<style></style>
