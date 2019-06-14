<template>
  <div class="scroll-item">
      <slot ref="slot"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'scroll-not-tab-item',
    data() {
      return {}
    },
    props: {},
    methods: {},
    watch: {},
    mounted() {
      this.$nextTick()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .scroll-item
    display: inline-block
</style>
