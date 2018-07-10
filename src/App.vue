<template>
  <div id="app">
    <main-header></main-header>
    <navbar></navbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainHeader from '@/components/main-header/main-header.vue';
import Navbar from '@/components/navbar/navbar.vue';
import Player from '@/components/player/player.vue';

@Component({
  components: {
    MainHeader,
    Navbar,
    Player,
  },
})
export default class App extends Vue {}
</script>

<style lang="stylus" scoped>
</style>
