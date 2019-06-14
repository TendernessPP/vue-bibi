<template>
  <div id="search">
    <div class="head-search">
      <div class="head-search_searchBox">
        <form action="#" class="search-input" @submit.prevent="submit">
          <i class="icon-search"></i>
          <yd-input
            type="search"
            :placeholder="placeholder"
            v-model="currentValue"
            ref="search"
          ></yd-input>
        </form>
      </div>
      <a href="javascript:;" class="head-search_cancel" @click="cancel">取消</a>
    </div>
    <div class="scroll">
      <app-scroll>
        <div class="head">
          <span class="txt">大家都在搜</span>
          <a href="javascript:void(0) " class="expand" @click="expand">展开</a>
        </div>
        <div class="expand-list">
          <a href="javascript:void(0)" class="expand-list_item" v-for="(item,index) in expandList"
             :key="index">{{item}}</a>
        </div>
        <div class="img-wrapper">
          <img :src="img" alt="" class="img">
        </div>
        <div class="searchHistory">
          <span class="txt">搜索历史</span>
          <div class="history-list">
            <a href="javascript:void(0)" class="history-list_item" v-for="(item,index) in historyList"
               :key="index">{{item}}</a>
          </div>
          <div class="clear-history-wrapper">
            <a href="javascript:void(0)" class="clear-history">清空搜索历史</a>
          </div>
        </div>
      </app-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
      'app-scroll': require('../components/scroll/scroll.vue').default
    },
    data() {
      return {
        currentValue: '',
        placeholder: '搜索',
        //展开列表
        expandM: false,
        expandList: ['RUNNINGMAN', '明日方舟', '罗汉', '燃茶', '巴拉巴拉小魔仙', '游乐王子', '王嘉尔', '周琛',
          '极限挑战', '华为', '非正式会谈', '创造营', '周杰伦', 'blackpink', '少年歌行', 'rng', '新宝岛', '切尔洛贝利', '第五人格', '多罗罗'],
        img: require('../assets/image/banner_1.jpg'),
        historyList: ['极限挑战', '华为', '非正式会谈', '创造营', '周杰伦', 'blackpink']
      }
    },
    methods: {
      expand() {
        let dom = document.querySelector('.scroll .expand-list')
        if (!this.expandM) {
          dom.style.height = 'auto'
          this.expandM = true
        } else {
          dom.style.height = 1.44 + 'rem'
          this.expandM = false
        }
      },
      //取消
      cancel() {
        this.$router.go(-1)
      },
      //提交
      submit() {
        console.log(this.$refs.search.setBlur())
        this.$refs.search.setBlur()
      }
    },
    mounted() {
      this.$nextTick(() => {
        // console.log(this.$refs.search.setFocus())
        this.$refs.search.setFocus()
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../assets/styl/mixin.styl"
  #search
    height: 100%
    width: 100%
    background-color: #fff
    .head-search
      height: 0.8rem
      display: flex
      padding: 0.14rem 0.2rem
      background-color: #f45a8d
      .head-search_searchBox
        flex: 1
        border-radius: 15px
        background-color: #fff
        display: flex
        align-items: center
        padding: 0.08rem 0.2rem
        .search-input
          width: 100%
          display: flex
          align-items: center
          i
            font-size: 0.4rem
      .head-search_cancel
        flex: 0 0 0.6rem
        margin-left: 0.22rem
        display: flex
        justify-content: center
        align-items: center
        color: #fff
        font-size: 0.26rem
    .scroll
      height: calc(100% - 0.8rem)
      background-color: rgba(0, 0, 0, .1)
    .head
      height: 0.7rem
      padding: 0 0.2rem
      display: flex
      justify-content: space-between
      align-items: center
      position: relative
      background-color: #fff
      &:after
        height: 1px
        position: absolute
        bottom: 0
        left: 0
        content: ''
        width: 100%
        background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
      .expand
        color: rgba(0, 0, 0, .6)
    .expand-list
      overflow: hidden
      padding: 0.2rem 0.2rem 0
      height: 1.44rem
      background-color: #fff
      .expand-list_item
        float: left
        border-radius: 5px
        padding: 0.1rem 0.24rem
        background-color: rgba(0, 0, 0, .1)
        margin-right: 0.2rem
        margin-bottom: 0.2rem
    .img-wrapper
      padding: 0.12rem 0.2rem
      background-color: rgba(0, 0, 0, .1)
      .img
        width: 100%
        border-radius: 4px
    .searchHistory
      background-color: #fff
      .txt
        padding: 0 0.2rem
        height: 0.7rem
        display: flex
        align-items: center
        position: relative
        &:after
          height: 1px
          position: absolute
          bottom: 0
          left: 0
          content: ''
          width: 100%
          background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
      .history-list
        overflow: hidden
        padding: 0.2rem
        height: 1.44rem
        background-color: #fff
        position: relative
        &:after
          height: 1px
          position: absolute
          bottom: 0
          left: 0
          content: ''
          width: 100%
          background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
        .history-list_item
          float: left
          border-radius: 5px
          padding: 0.1rem 0.24rem
          background-color: rgba(0, 0, 0, .1)
          margin-right: 0.2rem
          margin-bottom: 0.2rem
      .clear-history-wrapper
        height: 0.8rem
        display: flex
        justify-content: center
        align-items: center
        .clear-history
          color: rgba(0,0,0,.6)
</style>
