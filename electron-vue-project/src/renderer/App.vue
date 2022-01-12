<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
  export default {
    name: 'electron-vue-project',
    components: {
      AppHeader
    }
  }
</script>

<style>
</style>
