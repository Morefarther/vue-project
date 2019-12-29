<template>
  <div style=" width: 100%; height: 70px; text-align:center;display:flex;vertical-align:middle;justify-content:center;align-items:center; background: #d3dce6">
    <div class="gapLikeStyle"></div>
    <div class="buttonLikeStyle">
      <router-link to="/monitor" class="routeLinkStyle" style="text-decoration: none;">monitor</router-link>
    </div>
    <div class="gapLikeStyle"></div>
    <div class="buttonLikeStyle">
      <router-link to="/history" class="routeLinkStyle" style="text-decoration: none;">history</router-link>
    </div>
    <div class="gapLikeStyle"></div>
    <div class="buttonLikeStyle">
      <router-link to="/history">history</router-link>
    </div>
    <div class="gapLikeStyle"></div>
    <div class="buttonLikeStyle">
      <router-link to="/security" class="routeLinkStyle" style="text-decoration: none;">security</router-link>
    </div>
    <div class="gapLikeStyle"></div>
<!--
<router-link to="/">home</router-link>
<router-link :to="index">home</router-link>
<router-link :to="{path:'/'}">home</router-link>
<router-link :to="{name:'home'}">home</router-link>
-->
  </div>
</template>

<script>

  export default {
    name: 'Header'
  }
</script>

<style scoped>
  .buttonLikeStyle {
    width: 15%;
    height: 40px;
    background: aquamarine;
    float: left;
    text-align: center;
    align-items:center;
    display:flex;
    vertical-align:middle;
    justify-content:center;
  }
  .gapLikeStyle {
    width: 4%;
    height: 40px;
    float: left;
    display: inline-block;
  }
  .routeLinkStyle {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
