<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close" @click="hide">
            <i class="icon-close"></i>
          </div>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box @query="queryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll v-if="currentIndex === 0" :data="playHistory" class="list-scroll">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggest>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import SearchBox from '@/base/search-box/search-box.vue';
import Suggest from '@/components/suggest/suggest.vue';
import { SearchMixin } from '@/assets/js/mixin';
import Switches from '@/base/switches/switches.vue';
import Scroll from '@/base/scroll/scroll.vue';
import { State, Action } from 'vuex-class';
import SongList from '@/base/song-list/song-list.vue';

@Component({
  components: {
    SearchBox,
    Suggest,
    Switches,
    Scroll,
    SongList,
  },
})
export default class AddSong extends Mixins(SearchMixin) {
  @State private playHistory!: Array<any>;
  @Action insertSong!: (obj: any) => void;

  private showFlag: boolean = false;
  private showSinger: boolean = false;
  private currentIndex: number = 0;
  private switches: Array<Music.Switch> = [
    {
      name: '最近播放',
    },
    {
      name: '搜索历史',
    },
  ];

  $refs!: {
    searchBox: SearchBox;
  };

  show() {
    this.showFlag = true;
  }
  hide() {
    this.showFlag = false;
  }
  selectSuggest() {
    this.saveSearch();
  }
  blurInput() {
    this.$refs.searchBox.blur();
  }
  switchItem(index: number) {
    this.currentIndex = index;
  }
  selectSong(song: Song, index: number) {
    if (index !== 0) {
      this.insertSong({
        song,
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";
@import "~@/assets/stylus/mixin";

.add-song
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  z-index: 200
  background: $color-background
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .header
    position: relative
    height: 44px
    text-align: center
    .title
      line-height: 44px
      font-size: $font-size-large
      color: $color-text
    .close
      position: absolute
      top: 0
      right: 8px
      .icon-close
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
  .search-box-wrapper
    margin: 20px
  .shortcut
    .list-wrapper
      position: absolute
      top: 165px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
  .search-result
    position: fixed
    top: 124px
    bottom: 0
    width: 100%
  .tip-title
    text-align: center
    padding: 18px 0
    font-size: 0
    .icon-ok
      font-size: $font-size-medium
      color: $color-theme
      margin-right: 4px
    .text
      font-size: $font-size-medium
      color: $color-text
</style>
