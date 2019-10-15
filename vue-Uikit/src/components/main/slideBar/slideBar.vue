<template>
  <div class="slider aaaaaaaa">
    {{ msg }}
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<style scoped>
  @import "./slideBar.css";
</style>

<script>
  import slideBar from './slideBar'
  export default slideBar
</script>
