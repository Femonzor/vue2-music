<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BScroll from 'better-scroll';
import { addClass } from '@/assets/js/dom';

@Component
export default class Slider extends Vue {
  @Prop({ default: true })
  loop!: Boolean;
  @Prop({ default: true })
  autoPlay!: Boolean;
  @Prop({ default: 4000 })
  interval!: Number;

  $refs: any = {
    sliderGroup: HTMLElement,
  };

  mounted() {
    setTimeout(() => {
      this.setSliderWidth();
      this.initSlider();
    }, 20);
  }

  setSliderWidth() {
    let children = this.$refs.sliderGroup.children;
    let width = 0;
    let sliderWidth = this.$refs.slider.clientWidth;
    for (let i = 0, len = children.length; i < len; i++) {
      let child = children[i];
      addClass(child, 'slider-item');
      child.style.width = sliderWidth + 'px';
      width += sliderWidth;
    }
    if (this.loop) {
      width += 2 * sliderWidth;
    }
    this.$refs.sliderGroup.style.width = width + 'px';
  }
  initSlider() {}
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';

.slider
  min-height: 1px

  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap

    .slider-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center

      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none

      img
        display: block
        width: 100%

  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0

    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l

      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>
