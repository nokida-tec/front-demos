<template>
  <div>
<!--    <div>
       <headerNav></headerNav>
    </div>-->
    <div>
     <!-- <slideBar></slideBar>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import slideBar from './main/slideBar/slideBar.vue'
  import headerNav from './main/header/nav.vue'

  export default {
    components: {
      slideBar: slideBar,
      headerNav:headerNav
    }
  }
</script>
