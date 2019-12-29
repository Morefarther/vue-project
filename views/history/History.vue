<template>
  <div class="historyStyle">
    <HLeft/>
    <HDate/>
  </div>
</template>

<script>
  import HLeft from './HLeft'
  import HDate from './HDate'

  export default {
    name: 'History',
    components: {
      HLeft,
      HDate
    }
  }
</script>

<style scoped>
  .historyStyle {
    width: 100%;
    height: 590px;
    overflow: hidden;
    /*overflow-y: auto*/
  }
</style>
