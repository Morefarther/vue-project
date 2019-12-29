<template>
  <div class="monitorStyle">
    <MLeft/>
    <MData/>
  </div>
</template>

<script>
  import MLeft from './MLeft'
  import MData from './MData'

  export default {
    name: 'Monitor',
    components: {
      MLeft,
      MData
    }
  }
</script>

<style scoped>
  .monitorStyle {
    width: 100%;
    height: 590px;
    overflow: hidden;
    /*overflow-y: auto*/
  }

</style>
