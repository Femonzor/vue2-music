<template>
  <div id="app">
    <main-header></main-header>
    <navbar></navbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainHeader from '@/components/main-header/main-header.vue';
import Navbar from '@/components/navbar/navbar.vue';

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
