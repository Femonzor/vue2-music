<template>
  <scroll class="listview" ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.title" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" :key="item.id">
            <img v-lazy="item.avatar" :alt="item.name" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" v-for="(item, index) in shortcutList" :key="item" :data-index="index">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Scroll from '@/base/scroll/index.vue';
import { getData } from '@/assets/js/dom';

/** set accroding to style */
const ANCHOR_HEIGHT: number = 18;

@Component({
  components: {
    Scroll,
  },
})
export default class ListView extends Vue {
  touch: Music.TouchMove = {
    y1: 0,
    y2: 0,
    anchorIndex: 0,
  };

  @Prop({ default: () => [] })
  private data!: Array<any>;

  $refs: any = {
    listview: Scroll,
  };

  onShortcutTouchStart(event: TouchEvent) {
    const anchorIndex = getData(event.target, 'index');
    const firstTouch = event.touches[0];
    this.touch.y1 = firstTouch.pageY;
    if (anchorIndex) {
      this.touch.anchorIndex = +anchorIndex;
      this.scrollTo(this.touch.anchorIndex);
    }
  }
  onShortcutTouchMove(event: TouchEvent) {
    const firstTouch = event.touches[0];
    this.touch.y2 = firstTouch.pageY;
    const delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
    const anchorIndex = this.touch.anchorIndex + delta;
    this.scrollTo(anchorIndex);
  }
  scrollTo(index: number) {
    this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
  }

  get shortcutList() {
    return this.data.map(group => group.title.substr(0, 1));
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';

.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      &.current
        color: $color-theme
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
