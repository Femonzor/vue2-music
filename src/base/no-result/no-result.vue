<template>
  <div class="no-result">
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NoResult extends Vue {
  @Prop({ default: '' })
  private title!: string;
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";
@import "~@/assets/stylus/mixin";

.no-result
  text-align: center
  .no-result-text
    margin-top: 30px
    font-size: $font-size-medium
    color: $color-text-d
</style>
