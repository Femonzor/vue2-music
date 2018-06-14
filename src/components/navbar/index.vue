<template>
  <div class="navbar">
    <router-link tag="div" class="nav-item" :to="{ name: 'recommend' }">
      <span class="nav-link">推荐</span>
    </router-link>
    <router-link tag="div" class="nav-item" :to="{ name: 'singer' }">
      <span class="nav-link">歌手</span>
    </router-link>
    <router-link tag="div" class="nav-item" :to="{ name: 'rank' }">
      <span class="nav-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="nav-item" :to="{ name: 'search' }">
      <span class="nav-link">搜索</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable.styl';

.navbar
  display: flex
  height: 44px
  line-height: 44px
  font-size: $font-size-medium

  .nav-item
    flex: 1
    text-align: center

    .nav-link
      padding-bottom: 5px
      color: $color-text-l

    &.router-link-active
      .nav-link
        color: $color-theme
        border-bottom: 2px solid $color-theme
</style>
