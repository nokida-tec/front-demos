<template>
  <div class="slider">
    <SideMenu :style="{width:width+'px'}"
              :data="menus"
              :collapsed="collapsed">
    </SideMenu>
  </div>
</template>

<style scoped>
  @import "./slideBar.css";
</style>

<script>
  import slideBar from './slideBar'
  export default slideBar
</script>
