<template>
  <div class="hDateStyle">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'HDate'
  }
</script>

<style scoped>
  .hDateStyle {
    width: 80%;
    height: 550px;
    float: left;
    overflow: hidden;
    /*overflow-y: auto*/
  }
</style>
