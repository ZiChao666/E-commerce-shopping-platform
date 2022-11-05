<template>
  <div>
    <!-- 三级联动复用多，已注册为全局组件 -->
    <TypeNav></TypeNav>
    <!-- 轮播图和快报区域 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐 -->
    <Recommend></Recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!-- 楼层 -->
    <Floor v-for="item in floorList" :key="item.id" :list="item"></Floor>

    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pagas/Home/ListContainer/LIstContainer'
import Recommend from '@/pagas/Home/Recommend/Recommend'
import Rank from '@/pagas/Home/Rank/Rank'
import Like from '@/pagas/Home/Like/Like'
import Floor from './Floor/Floor.vue'
import Brand from './Brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  created() {
    this.$store.dispatch('Home/getFloorList')
  },
  computed: {
    ...mapState('Home', ['floorList'])
  },
  mounted() {
    // this.$store.dispatch('Login/getUserInfo')
  }
}
</script>

<style lang="less" scoped></style>
