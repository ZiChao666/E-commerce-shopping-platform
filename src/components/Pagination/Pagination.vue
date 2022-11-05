<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('sendPageNo', pageNo - 1)">上一页</button>
    <button v-if="StartAndEnd.start > 1" @click="$emit('sendPageNo', 1)" :class="{ active: pageNo == 1 }">1</button>
    <button v-if="StartAndEnd.start > 2">...</button>

    <!-- 中间部分 -->
    <span v-for="(item, index) in StartAndEnd.end" :key="index">
      <button v-if="item >= StartAndEnd.start" @click="$emit('sendPageNo', item)" :class="{ active: pageNo == item }">{{ item }}</button>
    </span>

    <button v-if="StartAndEnd.end < totalPage - 1">...</button>
    <button v-if="StartAndEnd.end < totalPage" @click="$emit('sendPageNo', totalPage)" :class="{ active: pageNo == totalPage }">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('sendPageNo', totalPage + 1)">下一页</button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 最多显示的页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 当前页数：pageNo
    // 当前每页有多少数据：pageSize
    // 总数据：total
    // 连续的页码个数：continues

    // 连续页码
    StartAndEnd() {
      const { pageNo, totalPage, continues } = this
      // 先定义开始和末页存储数据的变量
      let start = 0,
        end = 0
      // 连续页码至少是5页，如果不正常就是不够5页
      // 这是不正常的，连续也比总页数还大
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 正常的
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // bug 当pageNo是1，那start就小于1了
        if (start < 1) {
          start = 1
          end = continues
        }
        // bug 当pageNo是totalPage（最大的页数）或接近，那end就大于totalPage
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: red;
      color: #fff;
    }
  }
}
</style>
