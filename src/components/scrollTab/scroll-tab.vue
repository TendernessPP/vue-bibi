<template>
  <div class="scroll-box" ref="scrollBox" :style="{backgroundColor: bgColor}">
    <ul class="scroll-ul" ref="scrollUl" v-show="navList.length > 0">
      <!--:class="index === activeIndex?'is-acitve':''"-->
      <li class="list-item" v-for="(nav,index) in navList" :key="index" @click="changeActiveIndex(index)"
          :style="{fontSize:fontSize, height:height,lineHeight: height}"
          :class="{'is-active':index === activeIndex,'list-item_icon':icon}"
          ref="scrollLi">
        <!--nav数据-->
        <a class="list-item_val"
           :style="{color:index === activeIndex?activeColor: fontColor,paddingLeft: padding,paddingRight: padding,marginLeft:margin,marginRight:margin}"
           href="javascript:void(0);">
          <i :class="nav.icon" v-if="nav.icon" class="icon"></i>
          {{nav.text}}
          <!--小红点-->
          <span class="list-item_dot" v-if="nav.dot && !nav.badge" :style="{backgroundColor: dotColor}"></span>
          <!--角标数值-->
          <span class="list-item_badge" v-if="badge">{{nav.badge}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import { isColor } from '../../../src/util/assist'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        activeIndex: this.value || 0
      }
    },
    props: {
      //v-model数据绑定
      value: Number,
      //传入列表数组
      navList: {
        type: Array,
        default: []
      },
      //背景颜色
      bgColor: {
        validator(value) {
          if (!value) return true
          return isColor(value)
        },
        default: '#fff'
      },
      //列表高度
      height: {
        type: String,
        default: 'auto'
      },
      //元素padding
      padding: {
        validator(value) {
          return /^(\.|\d+\.)?\d+(px|rem)$/.test(value)
        },
        default: '0.06rem'
      },
      margin: {
        validator(value) {
          return /^(\.|\d+\.)?\d+(px|rem)$/.test(value)
        },
        default: '0.06rem'
      },
      //默认字体颜色
      fontColor: {
        validator(value) {
          if (!value) return true
          return isColor(value)
        },
        default: '#585858'
      },
      //选中字体颜色
      activeColor: {
        validator(value) {
          if (!value) return true
          return isColor(value)
        },
        default: '#FF5E53'
      },
      //字体大小
      fontSize: {
        validator(value) {
          return /^(\.|\d+\.)?\d+(px|rem)$/.test(value)
        },
        default: '.28rem'
      },
      //小红点
      dot: {
        type: Boolean,
        default: false
      },
      //小红点背景颜色
      dotColor: {
        validator(value) {
          if (!value) return true
          return isColor(value)
        },
        default: '#F6514B'
      },
      //列表点击执行事件
      itemClick: Function,
      //角标数值
      badge: String,
      //加+0.8rem ul
      special: {
        type: Boolean,
        default: false
      },
      //小图标
      icon: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      //列表点击事件
      changeActiveIndex(val) {
        this.activeIndex = val
        this.itemClick && this.itemClick(val)
        this.$emit('input', val)
      },
      //初始化滚动条
      _initScroll() {
        let ulWidth = 0
        let liArr = this.$refs.scrollLi
        liArr.forEach((item) => {
          ulWidth += (item.offsetWidth)
        })
        console.log(ulWidth)
        if (this.special) {
          this.$refs.scrollUl.style.width = (ulWidth + 30) + 'px'
        } else {
          this.$refs.scrollUl.style.width = ulWidth + 'px'
        }
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
    watch: {
      value(val) {
        this.activeIndex = val
      }
    },
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
    border-1px(#e5e5e5)
    .scroll-ul
      font-size: 0
      .list-item
        display: inline-block
        overflow: hidden
        &.is-active
          .list-item_val
            position: relative
            &:after
              content:''
              position: absolute
              bottom: -9px
              left: 0
              width: 100%
              height: 2px
              background-color: #f45a8d
        .list-item_val
          position: relative
          .list-item_dot
            position: absolute
            right: -6px
            top: -3px
            z-index: 9999
            width: 8px
            height: 8px
            border-radius: 50%
        &.list-item_icon
          &.is-acitve
            transform none
          .list-item_val
            display: flex
            flex-direction: column
            align-items: center
            width: 1.4rem
            .icon
              margin-bottom: 0.16rem
              font-size: 0.8rem
</style>
