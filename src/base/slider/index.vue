<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="item in dots" :key="item" :class="{active: currentPageIndex === item}"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BScroll from 'better-scroll';
import { addClass } from '@/assets/js/dom';
import { setTimeout, clearTimeout, clearInterval } from 'timers';

@Component
export default class Slider extends Vue {
  private slider!: BScroll;
  private children!: Array<HTMLElement>;
  private timer!: NodeJS.Timer;
  private dots: Array<number> = [];
  private currentPageIndex: number = 0;

  @Prop({ default: true })
  private loop!: boolean;
  @Prop({ default: true })
  private autoPlay!: boolean;
  @Prop({ default: 4000 })
  private interval!: number;

  $refs: any = {
    slider: HTMLElement,
    sliderGroup: HTMLElement,
  };

  mounted() {
    setTimeout(() => {
      this.setSliderWidth();
      this.initDots();
      this.initSlider();
      if (this.autoPlay) {
        this.play();
      }
    }, 20);
  }

  destroyed() {
    console.log('slider destroyed');
  }

  setSliderWidth() {
    this.children = this.$refs.sliderGroup.children;
    let childrenLength: number = this.children.length;
    let sliderWidth, sliderGroupWidth;
    if (this.loop) {
      sliderWidth = 100 / (childrenLength + 2) + '%';
      sliderGroupWidth = 100 * (childrenLength + 2) + '%';
    } else {
      sliderWidth = 100 / childrenLength + '%';
      sliderGroupWidth = 100 * childrenLength + '%';
    }
    for (let i = 0, len = this.children.length; i < len; i++) {
      const child: HTMLElement = this.children[i];
      addClass(child, 'slider-item');
      child.style.width = sliderWidth;
    }
    this.$refs.sliderGroup.style.width = sliderGroupWidth;
  }

  initDots() {
    this.dots = Array(this.children.length)
      .join(' ')
      .split(' ')
      .map((item, index) => index);
  }

  initSlider() {
    this.slider = new BScroll(this.$refs.slider, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.loop,
        threshold: 0.3,
        speed: 400,
      },
      click: true,
    });
    this.slider.on('scrollEnd', () => {
      const pageIndex = this.slider.getCurrentPage().pageX;
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this.play();
      }
    });
  }

  play() {
    clearTimeout(this.timer);
    let pageIndex = this.currentPageIndex;
    this.timer = setTimeout(() => {
      this.slider.next();
    }, this.interval);
  }
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
