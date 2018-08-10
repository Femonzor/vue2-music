<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
import { setTimeout, clearTimeout } from 'timers';

@Component
export default class TopTip extends Vue {
  @Prop({ default: 2000 })
  private delay!: number;

  private showFlag: boolean = false;
  private timer!: NodeJS.Timer;

  show() {
    this.showFlag = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.hide();
    }, this.delay);
  }
  hide() {
    this.showFlag = false;
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";

.top-tip
  position: fixed
  top: 0
  width: 100%
  z-index: 500
  background: $color-dialog-background
  &.drop-enter-active, &.drop-leave-active
    transition: all 0.3s
  &.drop-enter, &.drop-leave-to
    transform: translate3d(0, -100%, 0)
</style>
