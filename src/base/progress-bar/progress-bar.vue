<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend="progressTouchEnd">
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
export default class ProgressBar extends Vue {
  @Prop({ default: 0 })
  private percent!: number;

  private touch: Music.ProgressTouch = {
    initiated: false,
    startX: 0,
    left: 0,
  };

  $refs!: {
    progressBar: HTMLDivElement;
    progress: HTMLDivElement;
    /**
     * vscode warn with type cast, so use any instead of HTMLDivElement
     */
    progressBtn: HTMLDivElement;
  };

  @Watch('percent')
  onPercentChanged(percent: number) {
    if (percent >= 0 && !this.touch.initiated) {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      this.offset(offsetWidth);
    }
  }

  progressTouchStart(event: TouchEvent) {
    this.touch.initiated = true;
    this.touch.startX = event.touches[0].pageX;
    this.touch.left = this.$refs.progress.clientWidth;
  }
  progressTouchMove(event: TouchEvent) {
    if (!this.touch.initiated) return;
    const deltaX = event.touches[0].pageX - this.touch.startX;
    const offsetWidth = Math.min(
      this.$refs.progressBar.clientWidth - progressBtnWidth,
      Math.max(0, this.touch.left + deltaX),
    );
    this.offset(offsetWidth);
  }
  progressTouchEnd(event: TouchEvent) {
    this.touch.initiated = false;
    this.triggerPercent();
  }
  offset(offsetWidth: number) {
    this.$refs.progress.style.width = `${offsetWidth}px`;
    /**
     * vscode warn when using <> to cast type, so use as instead
     */
    (this.$refs.progressBtn.style as any)[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
  }
  triggerPercent() {
    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
    const percent = this.$refs.progress.clientWidth / barWidth;
    this.$emit('percentChange', percent);
  }
  progressClick(event: MouseEvent) {
    const rect = this.$refs.progressBar.getBoundingClientRect();
    const offsetWidth = event.pageX - rect.left;
    this.offset(offsetWidth - progressBtnWidth / 2);
    // this.offset(event.offsetX - progressBtnWidth / 2);
    this.triggerPercent();
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
