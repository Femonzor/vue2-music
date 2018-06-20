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
  scroll!: BScroll;

  @Prop({ default: 1 })
  probeType!: number;
  @Prop({ default: true })
  click!: true;
  @Prop({ default: () => [] })
  data!: Array<Object>;

  @Watch('data')
  onDataChanged() {
    setTimeout(() => {
      this.refresh();
    }, 20);
  }

  $refs: any = {
    wrapper: HTMLElement,
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
}
</script>

<style lang="stylus" scoped>
</style>
