<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="(checked = item.isChecked == 1)" @change="unselect(item, $event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('sub', -1, item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="handler('change', $event.target.value * 1, item)" />
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartSkuId(item)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0" @change="selectAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deletePickShop">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="pay">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入节流
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters('ShopCart', ['shopCartList']),
    cartInfoList() {
      return this.shopCartList.cartInfoList || []
    },
    totalPrice() {
      return this.cartInfoList.filter((item) => item.isChecked === 1).reduce((pre, item) => (pre += item.skuNum * item.skuPrice), 0)
    },
    // 单个全选，全选框就选中
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1)
    }
  },

  methods: {
    getData() {
      this.$store.dispatch('ShopCart/getShopCartList')
    },
    // 开启节流
    handler: throttle(async function (type, disNum, item) {
      // type : 区分这个三个元素，确定点击了哪一个
      // disNum ：差值 +1 -1 改变的数量（并不是差值）
      // item : 确认点击哪个产品（有id）
      switch (type) {
        // 加号
        case 'add':
          disNum = 1
          break
        // 减号
        case 'sub':
          disNum = item.skuNum > 1 ? -1 : 0
          break
        // 文本框
        case 'change':
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - item.skuNum
          }
          break
      }
      try {
        await this.$store.dispatch('ShopCart/addShopCartList', { skuId: item.skuId, skuNum: disNum })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 800),

    // 删除购物车某一项
    async deleteCartSkuId(item) {
      try {
        await this.$store.dispatch('ShopCart/deleteShopCartSkuId', item.skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改选中单个商品的状态
    async unselect(item, e) {
      try {
        let isChecked = e.target.checked ? '1' : '0'
        await this.$store.dispatch('ShopCart/unchecked', { skuId: item.skuId, isChecked: isChecked })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除选中商品
    async deletePickShop() {
      try {
        await this.$store.dispatch('ShopCart/deletePickShop')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 点击全选全部选中，取消全选全部取消
    async selectAll(e) {
      try {
        let isChecked = e.target.checked ? '1' : '0'
        await this.$store.dispatch('ShopCart/selectAll', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 结算
    pay() {
      this.$router.push('/trade')
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
