<template>
  <div class="main-header">
    <!-- <div class="icon"></div> -->
    <h1 class="text">Vue Music App</h1>
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MainHeader extends Vue {}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";
@import "~@/assets/stylus/mixin";

.main-header
  position: relative
  height: 44px
  text-align: center
  color: $color-theme
  font-size: 0
.icon
  display: inline-block
  vertical-align: top
  margin-top: 6px
  width: 30px
  height: 32px
  margin-right: 9px
  // bg-image("logo")
  background-size: 30px 32px
.text
  display: inline-block
  vertical-align: top
  line-height: 44px
  font-size: $font-size-large
.mine
  position: absolute
  top: 0
  right: 0

  .icon-mine
    display: block
    padding: 12px
    font-size: 20px
    color: $color-theme
</style>
