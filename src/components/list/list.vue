<template>
  <article class="app-list" :class="classes">
    <div class="app-list-item">
      <slot name="top" v-if="!!$slots.top"></slot>
      <slot name="body" v-if="!!$slots.body"></slot>
      <slot name="other" v-if="!!$slots.other"></slot>
    </div>
  </article>
</template>

<script>
  export default {
    props: {
      theme: {
        validator(value) {
          return ['1', '2', '3', '4', '5', '6', '7'].indexOf(value + '') > -1
        },
        default: '1'
      }
    },
    data() {
      return {}
    },
    computed: {
      classes() {
        return 'app-list-theme' + this.theme
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/styl/mixin.styl"
  .app-list
    position: relative
    overflow: hidden
    &.app-list-theme1
      margin-bottom: 0.2rem
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
      flex: 0 0 49%
      border-radius: 10px
      &:nth-child(odd)
        margin-right: 2%
      &:nth-last-child(2)
        margin-bottom: 0
      &:last-child
        margin-bottom: 0
      .app-list-item
        text-align: left
        .app-list-item_top
          position: relative
          img
            width: 100%
          .desc
            position: absolute
            bottom: 0
            left: 0
            width: 100%
            padding: 0 0.1rem 0.1rem
            display: flex
            justify-content: space-between
            align-items: center
            color: rgba(255, 255, 255, .7)
            .play, .comment, .time,.fans
              display: flex
              align-items: center
              > i
                font-size: 0.4rem
        .app-list-item_body
          font-size: 0.26rem
          padding: 0.1rem 0.1rem 0.24rem
          min-height: 0.96rem
          line-height: 1.3
          display: inline-block
          overflow: hidden
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
          word-break: break-all
          text-overflow: ellipsis
        .app-list-item_other
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0.1rem
          .other_left
            transform: scale(0.8)
            color: rgba(0, 0, 0, .6)
            &.is-hot
              padding: 0.04rem
              background-color: #ff9900
              color: #fff
            .ad
              margin-right: 0.1rem
              padding: 0.04rem
              border: 1px solid #e5e5e5
      &.is-special
        box-shadow: none
        border-radius: 0
        .app-list-item
          .app-list-item_top
            img
              border-radius: 10px
          .app-list-item_body
            width: 100%
            padding: 0.1rem
            min-height: auto
            line-height: 1
            display: inline-block
            overflow: hidden
            white-space nowrap
            word-break: break-all
            text-overflow: ellipsis
          .app-list-item_other
            justify-content: flex-start
            .other_left
              transform none
              flex: 1
              display: flex
              align-items: center
              padding: 0.1rem 0
              img
                width: 0.6rem
                height: 0.6rem
                border-radius: 50%
              .title-user
                display: flex
                flex-direction: column
                text-align: left
                margin-left: 0.2rem
                .title
                  color: #000
                .user
                  margin-top: 0.1rem
            .other_right
              flex: 0 0 0.46rem
            .type
              font-size: 0.24rem
              color: rgba(0, 0, 0, .6)
    &.app-list-theme2
      background-color: #fff
      padding: 0.16rem 0.2rem
      position: relative
      &:after
        height: 1px
        position: absolute
        bottom: 0
        left: 0
        content: ''
        width: 100%
        background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
      .app-list-item
        display: flex
        .app-list-item_top
          flex: 0 0 3rem
          position: relative
          img
            width: 100%
            border-radius: 10px
          .desc
            position: absolute
            right: 0.08rem
            bottom: 0.08rem
            background-color: rgba(0, 0, 0, .2)
            .time
              padding: 0.04rem
              border-radius: 2px
              color: rgba(255, 255, 255, .7)
        .app-list-item_body
          flex: 1
          margin-left: 0.2rem
          text-align: left
          //height: 100%
          display: flex
          flex-direction: column
          justify-content: space-between
          .title
            line-height: 1.3
            overflow: hidden
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            word-break: break-all
            text-overflow: ellipsis
          .type
            min-height: 0.32rem
            .txt
              display: inline-block
              &.is-hot
                background-color: #f90
                padding: 0.04rem
                border-radius: 4px
                color: #fff
                font-size: 0.24rem
          .name
            color: rgba(0, 0, 0, .6)
            margin-top: 0.1rem
          .seeAndTimeWrapper
            height: 0.4rem
            display: flex
            justify-content: space-between
            align-items: center
            color: rgba(0, 0, 0, .6)
            .see
              margin-right: 0.1rem
    &.app-list-theme3
      padding: 0.2rem 0
      .app-list-item
        .app-list-item_top
          .top_head
            display: flex
            justify-content: space-between
            align-items: center
            margin-bottom: 0.2rem
            .top_head-left
              display: flex
              align-items: center
              img
                width: 0.6rem
                height: 0.6rem
                border-radius: 50%
              .name-time
                margin-left: 0.2rem
                display: flex
                flex-direction: column
                text-align: left
                .name
                  color: #f45a8d
                .time
                  color: rgba(0, 0, 0, .6)
                  margin-top: 0.1rem
            .top_head-right
              display: flex
              align-items: center
              .attention
                border: 1px solid #f45a8d
                color: #f45a8d
                padding: 0.04rem 0.14rem
                border-radius: 4px
                display: flex
                align-items: center
                margin-right: 0.16rem
          .top_title
            text-align: left
            margin-bottom: 0.2rem
            .type
              color: blue
        .app-list-item_body
          position: relative
          img
            width: 100%
          .desc
            position: absolute
            bottom: 0.1rem
            left: 0.1rem
            color: rgba(255, 255, 255, .7)
        .app-list-item_other
          text-align: left
          .description
            color: #333
            padding: 0.1rem 0
          .options
            height: 0.6rem
            display: flex
            align-items: center
            > span
              flex: 1
              display: flex
              justify-content: center
              align-items: center
              color: rgba(0, 0, 0, .6)
              > i
                margin-right: 0.1rem
</style>
