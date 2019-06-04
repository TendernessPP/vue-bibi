<template>
  <div>
    <div class="head-search">
      <img src="../assets/image/80x80.png" alt="" class="avata">
      <div class="head-search_searchBox" @click="goSearch">
        <i class="icon-search"></i>
      </div>
      <i class="icon-youxiji"></i>
      <i class="icon-xiaoxi"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
    },
    data() {
      return {}
    },
    methods: {
      //去search页面
      goSearch() {
        this.$goRoute({
          name: 'search'
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../src/assets/styl/mixin.styl"
  .head-search
    height: 0.8rem
    display: flex
    align-items: center
    padding: 0.1rem 0.2rem
    background-color: #f45a8d
    .head-search_searchBox
      flex: 1
      border-radius: 20px
      background-color: rgba(0,0,0,.15)
      display: flex
      align-items: center
      padding: 0.04rem 0.2rem
      .icon-search
        font-size: 0.4rem
        color: #e1e1e1
    .avata
      width: 0.5rem
      height: 0.5rem
      margin-right: 0.3rem
      border-radius: 50%
    .icon-youxiji,.icon-xiaoxi
      color: #fff
      margin-left: 0.3rem
</style>
