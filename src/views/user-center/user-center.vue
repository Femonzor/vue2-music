<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
      </div>
      <div class="play-btn" ref="playBtn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll ref="favoriteList" v-if="currentIndex === 0" :data="favoriteList" class="list-scroll">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" v-if="currentIndex === 1" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import Switches from '@/base/switches/switches.vue';
import { State, Action } from 'vuex-class';
import Scroll from '@/base/scroll/scroll.vue';
import SongList from '@/base/song-list/song-list.vue';
import { PlayListMixin } from '@/assets/js/mixin';
import NoResult from '@/base/no-result/no-result.vue';

@Component({
  components: {
    Switches,
    Scroll,
    SongList,
    NoResult,
  },
})
export default class UserCenter extends Mixins(PlayListMixin) {
  @State private favoriteList!: Array<any>;
  @State private playHistory!: Array<any>;
  @Action insertSong!: (obj: any) => void;
  @Action randomPlay!: (obj: any) => void;

  private currentIndex: number = 0;
  private switches: Array<Music.Switch> = [
    {
      name: '我喜欢的',
    },
    {
      name: '最近听的',
    },
  ];

  $refs!: {
    playBtn: HTMLDivElement;
    listWrapper: HTMLDivElement;
    favoriteList: Scroll;
    playList: Scroll;
  };

  switchItem(index: number) {
    this.currentIndex = index;
  }
  selectSong(song: Song) {
    this.insertSong({
      song,
    });
  }
  back() {
    this.$router.back();
  }
  random() {
    let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;
    if (list.length === 0) return;
    this.randomPlay({
      list,
    });
  }
  handlePlayList(playList: Array<any>) {
    const bottom = playList.length ? '60px' : '';
    this.$refs.listWrapper.style.bottom = bottom;
    this.$refs.favoriteList && this.$refs.favoriteList.refresh();
    this.$refs.playList && this.$refs.playList.refresh();
  }

  get noResult() {
    if (this.currentIndex === 0) {
      return !this.favoriteList.length;
    } else {
      return !this.playHistory.length;
    }
  }
  get noResultDesc() {
    if (this.currentIndex === 0) {
      return '暂无收藏歌曲';
    } else {
      return '你好没有听过歌曲';
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";

.user-center
  position: fixed
  top: 0
  bottom: 0
  z-index: 100
  width: 100%
  background: $color-background
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .back
    position absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .switches-wrapper
    margin: 10px 0 30px 0
  .play-btn
    box-sizing: border-box
    width: 135px
    padding: 7px 0
    margin: 0 auto
    text-align: center
    border: 1px solid  $color-text-l
    color: $color-text-l
    border-radius: 100px
    font-size: 0
    .icon-play
      display: inline-block
      vertical-align: middle
      margin-right: 6px
      font-size: $font-size-medium-x
    .text
      display: inline-block
      vertical-align: middle
      font-size: $font-size-small
  .list-wrapper
    position: absolute
    top: 110px
    bottom: 0
    width: 100%
    .list-scroll
      height: 100%
      overflow: hidden
      .list-inner
        padding: 20px 30px
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
