<template>
  <div class="mDateStyle">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'MData'
  }
</script>

<style scoped>
  .mDateStyle {
    width: 80%;
    height: 550px;
    float: left;
    overflow: hidden;
    /*overflow-y: auto*/
  }

</style>
