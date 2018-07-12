<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { prefixStyle } from '@/assets/js/dom';

const progressBtnWidth: number = 16;
const transform = prefixStyle('transform');

@Component
export default class ProgressBar extends Vue{
  @Prop({ default: 0 })
  percent!: number;

  $refs: any = {};

  @Watch('percent')
  onPercentChanged(percent: number) {
    if (percent > 0) {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";
.progress-bar
  height: 30px
  .bar-inner
    position: relative
    top: 13px
    height: 4px
    background: rgba(0, 0, 0, 0.3)
    .progress
      position: absolute
      height: 100%
      background: $color-theme
    .progress-btn-wrapper
      position: absolute
      left: -8px
      top: -13px
      width: 30px
      height: 30px
      .progress-btn
        position: relative
        top: 7px
        left: 7px
        box-sizing: border-box
        width: 16px
        height: 16px
        border: 3px solid $color-text
        border-radius: 50%
        background: $color-theme
</style>
