<template>
  <div id="app">
    <keep-alive><router-view/></keep-alive>
    <div class="footer" v-if="$route.name!=='search'">
      <yd-tabbar active-color="#f45a8d" padding="0.12rem" fontsize="0.26rem">
        <yd-tabbar-item :title="item.title" :link="item.link" :active="$route.path===item.link" v-for="(item,index) in  navBarArr" :key="item+index">
          <i :class="$route.path===item.link?item.iconsel:item.icon"  slot="icon"></i>
          <yd-badge slot="badge" type="danger" v-if="item.dager" scale="0.8">{{item.dager}}</yd-badge>
        </yd-tabbar-item>
      </yd-tabbar>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        navBarArr: [
          {
            title: '首页',
            link: '/index',
            icon: 'icon-home',
            iconsel: 'icon-homesel'
          },
          {
            title: '频道',
            link: '/channel',
            icon: 'icon-channel',
            iconsel: 'icon-channelsel'
          },
          {
            title: '动态',
            link: '/moving',
            icon: 'icon-moving',
            iconsel: 'icon-movingsel'
          },
          {
            title: '会员购',
            link: '/memberPurchase',
            icon: 'icon-memberPurchase',
            iconsel: 'icon-memberPurchasesel'
          },
          {
            title: '我的',
            link: '/me',
            icon: 'icon-me',
            iconsel: 'icon-mesel'
          }
        ]
      }
    },
    created () {
      this.$nextTick(() => {
      })
    }
  }
</script>
<style lang="stylus">
  @import "../src/assets/styl/index.styl"
  .g-fix-ios-prevent-scroll
    overflow: hidden!important
    position: fixed
    width: 100%
  #app
    width: 100%
    height: 100%
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif
    .footer
      width: 100%
      position: absolute
      left: 0
      bottom: 0
      .yd-tabbar-txt
        font-size: 12px;
        transform: scale(0.8)
        display: inline-block
      .yd-tabbar-badge
        z-index: 998
</style>
