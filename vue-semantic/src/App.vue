<template>
  <div id="app">

    <!--此处可自行拓展-->
    <router-view></router-view>
  </div>
</template>
<style scoped>
  #app{
    height:100%;
  }
  #app>div {
    height:100%;
  }
</style>

<script>
  export default { name: 'App' }
</script>
