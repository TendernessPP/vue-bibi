<template>
  <div class="demo">
    <div class="switch">
      <input id="switch-toggle-1" class="switch-toggle switch-toggle-round" type="checkbox" v-model="val">
      <label for="switch-toggle-1"></label>
    </div>
    <div class="switch">
      <input id="switch-toggle-4" class="switch-toggle switch-toggle-round-flat" type="checkbox">
      <label for="switch-toggle-4"></label>
    </div>
    <div class="switch">
      <input id="switch-toggle-7" class="switch-toggle switch-toggle-yes-no" type="checkbox">
      <label for="switch-toggle-7" data-on="Yes" data-off="No"></label>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {},
    data() {
      return {
        val: false
      }
    },
    watch: {
      val(value) {
        console.log(value)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .switch-toggle {
    position: absolute;
    margin-left: -9999px;
    visibility: hidden;
  }

  .switch-toggle + label {
    display: block;
    position: relative;
    cursor: pointer;
    outline: none;
    user-select: none;
  }

  input.switch-toggle-round + label {
    padding: 2px;
    width: 120px;
    height: 60px;
    background-color: #dddddd;
    border-radius: 60px;
  }

  input.switch-toggle-round + label:before,
  input.switch-toggle-round + label:after {
    display: block;
    position: absolute;
    top: 1px;
    left: 1px;
    bottom: 1px;
    content: "";
  }

  input.switch-toggle-round + label:before {
    right: 1px;
    background-color: #f1f1f1;
    border-radius: 60px;
    transition: background 0.4s;
  }

  input.switch-toggle-round + label:after {
    width: 58px;
    background-color: #fff;
    border-radius: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: margin 0.4s;
  }

  input.switch-toggle-round:checked + label:before {
    background-color: #8ce196;
  }

  input.switch-toggle-round:checked + label:after {
    margin-left: 60px;
  }

  .demo
    height: 100%
    width: 100%
    font-size: 0.28rem

  input.switch-toggle-round-flat + label {
    padding: 2px;
    width: 120px;
    height: 60px;
    background-color: #dddddd;
    border-radius: 60px;
    transition: background 0.4s;
  }

  input.switch-toggle-round-flat + label:before,
  input.switch-toggle-round-flat + label:after {
    display: block;
    position: absolute;
    content: "";
  }

  input.switch-toggle-round-flat + label:before {
    top: 2px;
    left: 2px;
    bottom: 2px;
    right: 2px;
    background-color: #fff;
    border-radius: 60px;
    transition: background 0.4s;
  }

  input.switch-toggle-round-flat + label:after {
    top: 4px;
    left: 4px;
    bottom: 4px;
    width: 52px;
    background-color: #dddddd;
    border-radius: 52px;
    transition: margin 0.4s, background 0.4s;
  }

  input.switch-toggle-round-flat:checked + label {
    background-color: #8ce196;
  }

  input.switch-toggle-round-flat:checked + label:after {
    margin-left: 60px;
    background-color: #8ce196;
  }

  //3

  input.switch-toggle-yes-no + label {
    padding: 2px;
    width: 120px;
    height: 60px;
  }

  input.switch-toggle-yes-no + label:before,
  input.switch-toggle-yes-no + label:after {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: #fff;
    font-family: "Roboto Slab", serif;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
  }

  input.switch-toggle-yes-no + label:before {
    background-color: #dddddd;
    content: attr(data-off);
    transition: transform 0.5s;
    backface-visibility: hidden;
  }

  input.switch-toggle-yes-no + label:after {
    background-color: #8ce196;
    content: attr(data-on);
    transition: transform 0.5s;
    transform: rotateY(180deg);
    backface-visibility: hidden;
  }

  input.switch-toggle-yes-no:checked + label:before {
    transform: rotateY(180deg);
  }

  input.switch-toggle-yes-no:checked + label:after {
    transform: rotateY(0);
  }
</style>
