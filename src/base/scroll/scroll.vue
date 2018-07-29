<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import BScroll from 'better-scroll';
import { setTimeout } from 'timers';

@Component
export default class Scroll extends Vue {
  private scroll!: BScroll;

  @Prop({ default: 1 })
  private probeType!: number;
  @Prop({ default: true })
  private click!: true;
  @Prop({ default: () => [] })
  private data!: Array<any>;
  @Prop({ default: false })
  private listenScroll!: boolean;

  @Watch('data')
  onDataChanged() {
    setTimeout(() => {
      this.refresh();
    }, 20);
  }

  $refs!: {
    wrapper: HTMLDivElement;
  };

  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  }

  initScroll() {
    if (!this.$refs.wrapper) return;
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: this.click,
    });
    if (this.listenScroll) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position);
      });
    }
  }

  enable() {
    this.scroll && this.scroll.enable();
  }
  disable() {
    this.scroll && this.scroll.disable();
  }
  refresh() {
    this.scroll && this.scroll.refresh();
  }
  scrollTo(x: number, y: number, time: number) {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }
  scrollToElement(item: HTMLElement, time: number) {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }
}
</script>

<style lang="stylus" scoped>
</style>
