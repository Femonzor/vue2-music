<template>
  <div id="app">
    <main-header></main-header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MainHeader from '@/components/main-header/index.vue';

@Component({
  components: {
    MainHeader,
  },
})
export default class App extends Vue {}
</script>

<style lang="stylus" scoped>
</style>
