<template>
  <div class="scroll-box" ref="scrollBox">
    <div class="scroll-content" ref="scrollContent">
      <slot ref="slot"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {}
    },
    props: {},
    methods: {
      //初始化滚动条
      _initScroll() {
        let domWidth = 0
        let liArr = this.$children.filter(item => item.$options.name === 'scroll-not-tab-item')
        liArr.forEach((item) => {
          domWidth += item.$el.clientWidth
          // console.log(item.$el.clientWidth)
        })
        // console.log(domWidth)
        this.$refs.scrollContent.style.width = domWidth + 'px'
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.scrollBox, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    watch: {},
    mounted() {
      this.$nextTick(
        () => {
          this._initScroll()
        }
      )
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../src/assets/styl/mixin.styl"
  .scroll-box
    width: 100%
    overflow: hidden
    white-space: nowrap
</style>
