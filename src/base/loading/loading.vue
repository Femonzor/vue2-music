<template>
  <div class="loading">
    <img src="./loading.gif" alt="loading" style="width:24px;height:24px;">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({ default: '正在载入...' })
  title!: string;
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';

.loading
  width: 100%
  text-align: center

  .desc
    line-height: 20px
    font-size: $font-size-small
    color: $color-text-l
</style>
