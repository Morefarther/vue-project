<template>
  <div>
    <Header/>
    <div class="middleStyle">
      <router-view></router-view>
    </div>
    <Foot/>
  </div>
</template>

<script>
  import Foot from './components/footer/Footer'
  import Header from './components/header/Header'

  export default {
    name: 'App',
    components: {
      Foot,
      Header
    }
  }
</script>

<style>
  .middleStyle {
    width: 100%;
    height: 590px;
    overflow: hidden;
    /*overflow-y: auto;*/
  }
</style>
