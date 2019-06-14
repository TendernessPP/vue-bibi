<template>
  <div class="demo">
    <app-scroll-not-tab>
      <app-scroll-not-tab-item v-for="(item,index) in num" :key="index">
        <div style="border: 1px solid red;height: 1rem;width: 1rem;display: inline-block">{{item}}</div>
      </app-scroll-not-tab-item>
    </app-scroll-not-tab>
  </div>
</template>

<script>
  export default {
    components: {
      'app-scroll-not-tab': require('../../src/components/scrollNotTab/scroll-not-tab.vue').default,
      'app-scroll-not-tab-item': require('../../src/components/scrollNotTab/scroll-not-tab-item.vue').default
    },
    data() {
      return {
        num: 30
      }
    },
    mounted() {},
    computed: {},
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  .demo
    position: absolute
    bottom: 0.94rem
    top: 0
    width: 100%
    overflow: hidden
</style>
