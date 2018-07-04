<template>
  <scroll class="listview" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.title" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" class="list-group-item" v-for="item in group.items" :key="item.id">
            <img v-lazy="item.avatar" :alt="item.name" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul ref="shortcutList">
        <li class="item" :class="{current: currentIndex === index}" v-for="(item, index) in shortcutList" :key="item" :data-index="index">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixedTitle">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-wrapper" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Scroll from '@/base/scroll/index.vue';
import Loading from '@/base/loading/index.vue';
import { getData } from '@/assets/js/dom';
import { setTimeout } from 'timers';

/** set accroding to style */
const ANCHOR_HEIGHT: number = 18;
const FIXED_TITLE_HEIGHT: number = 30;

@Component({
  components: {
    Scroll,
    Loading,
  },
})
export default class ListView extends Vue {
  private anchorIndex: number = 0;
  private shortcutListTop: number = 0;
  private listenScroll: boolean = true;
  private scrollY: number = -1;
  private currentIndex: number = 0;
  private listHeight: Array<number> = [];
  private shortcutListHeight: Array<number> = [];
  private diff: number = -1;
  private probeType: number = 3;
  private fixedTop: number = 0;

  @Prop({ default: () => [] })
  private data!: Array<any>;

  @Watch('scrollY')
  onScrollYChanged(val: number, oldVal: number) {
    if (val > 0) {
      this.currentIndex = 0;
      return;
    }
    let i, len;
    for (i = 0, len = this.listHeight.length - 1; i < len; i++) {
      let height = this.listHeight[i];
      let nextHeight = this.listHeight[i + 1];
      if (-val >= height && -val < nextHeight) {
        this.currentIndex = i;
        this.diff = nextHeight + val;
        return;
      }
    }
    this.currentIndex = len - 2;
  }
  @Watch('diff')
  onDiffChanged(val: number) {
    let fixedTop = val > 0 && val < FIXED_TITLE_HEIGHT ? val - FIXED_TITLE_HEIGHT : 0;
    if (this.fixedTop === fixedTop) return;
    this.fixedTop = fixedTop;
    this.$refs.fixedTitle.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
  }

  $refs: any = {
    listview: Scroll,
  };

  updated() {
    if (!this.shortcutListTop) {
      this.shortcutListTop = this.$refs.shortcutList.getBoundingClientRect().top;
    }
    if (!this.listHeight.length) {
      this.calculateHeight();
    }
  }

  onShortcutTouchStart(event: TouchEvent) {
    const anchorIndex = getData(event.target, 'index');
    if (anchorIndex) {
      this.anchorIndex = +anchorIndex;
      setTimeout(() => {
        this.scrollTo(this.anchorIndex);
      }, 16);
    }
  }
  onShortcutTouchMove(event: TouchEvent) {
    const distY = event.touches[0].pageY - this.shortcutListTop;
    let anchorIndex: number = 0;
    let i, len;
    if (distY < 0) {
      anchorIndex = 0;
    } else {
      for (i = 0, len = this.shortcutListHeight.length - 1; i < len; i++) {
        if (distY >= this.shortcutListHeight[i] && distY < this.shortcutListHeight[i + 1]) {
          break;
        }
      }
      anchorIndex = i;
    }
    this.scrollTo(anchorIndex);
  }
  scroll(position: BScroll.Position) {
    this.scrollY = position.y;
  }
  scrollTo(index: number) {
    if (index < 0) {
      index = 0;
    } else if (index > this.listHeight.length - 2) {
      index = this.listHeight.length - 2;
    }
    this.scrollY = -this.listHeight[index];
    this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 1);
  }
  calculateHeight() {
    const list = this.$refs.listGroup;
    let height = 0,
      shortcutHeight = 0;
    this.listHeight.push(height);
    this.shortcutListHeight.push(shortcutHeight);
    list.forEach((item: HTMLElement) => {
      height += item.clientHeight;
      shortcutHeight += ANCHOR_HEIGHT;
      this.listHeight.push(height);
      this.shortcutListHeight.push(shortcutHeight);
    });
  }
  selectItem(item: Music.Singer) {
    this.$emit('select', item);
  }

  get shortcutList() {
    return this.data.map(group => group.title.substr(0, 1));
  }
  get fixedTitle() {
    if (this.scrollY > 0) return '';
    return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
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
  .loading-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
