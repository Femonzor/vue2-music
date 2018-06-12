<template>
  <div id="app">
    <main-header></main-header>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainHeader from '@/components/main-header/index.vue';
import Navbar from '@/components/navbar/index.vue';

@Component({
  components: {
    MainHeader,
    Navbar,
  },
})
export default class App extends Vue {}
</script>

<style lang="stylus" scoped>
</style>
