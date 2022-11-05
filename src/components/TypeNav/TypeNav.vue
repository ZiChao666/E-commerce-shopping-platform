<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="changeLeave" @mouseenter="showList">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(item1, index) in categoryList" :key="item1.categoryId" :class="{ cur: curIndex == index }">
                <!-- 一级分类 -->
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="item1.categoryName" :data-category1Id="item1.categoryId">{{ item1.categoryName }}</a>
                </h3>
                <!-- 二级三级分类 -->
                <div class="item-list clearfix" :style="{ display: curIndex == index ? 'block' : 'none' }">
                  <div class="subitem" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="item2.categoryName" :data-category2Id="item2.categoryId">{{ item2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                          <a :data-categoryName="item3.categoryName" :data-category3Id="item3.categoryId">{{ item3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入节流
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      curIndex: -1,
      show: true
    }
  },
  mounted() {
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState('Home', ['categoryList'])
  },
  methods: {
    goSearch(e) {
      let element = e.target
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与值
      let { categoryname, category1id, category2id, category3id } = element.dataset
      //如果标签身上带有categoryname一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        // 一级分类，二级分类，三级分类的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        if (this.$route.params) {
          // 如果有params参数带过去
          location.params = this.$route.params
          // 整理完参数
          location.query = query
          // 路由跳转
          this.$router.push(location)
        }
      }
    },
    // 节流器
    changeIndex: throttle(function (index) {
      this.curIndex = index
    }, 50),
    changeLeave() {
      this.curIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    showList() {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
