<template>
  <ul class="switches">
    <li class="switch-item" v-for="(item, index) in switches" :key="item.name" :class="{'active': currentIndex === index}" @click="switchItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Switches extends Vue {
  @Prop({ default: () => [] })
  private switches!: Array<any>;
  @Prop({ default: 0 })
  private currentIndex!: number;

  switchItem(index: number) {
    this.$emit('switch', index);
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";

.switches
  display: flex
  align-items: center
  width: 240px
  margin: 0 auto
  border: 1px solid $color-highlight-background
  border-radius: 5px
  .switch-item
    flex: 1
    padding: 8px
    text-align: center
    font-size: $font-size-medium
    color: $color-text-d
    &.active
      background: $color-highlight-background
      color: $color-text
</style>
