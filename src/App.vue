<template>
<Header/>
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.2/css/all.css"/>
  <router-view/>
</template>
<script>
  import Header from "./components/Header";

  export default {
    name:'App',
    components:{
      Header
    },

  }
</script>
<style lang="scss">
  .listfade-enter-from,
  .listfade-leave-to {
    transform: translateY(50%);
    opacity: 0;
  }

  .listfade-move {
    position: absolute;
    transition: all 1s ease;
  }
</style>
