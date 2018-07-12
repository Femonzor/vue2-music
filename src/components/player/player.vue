<template>
  <div class="player" v-show="playList.length">
    <transition name="normal" @enter="normalEnter" @after-enter="normalAfterEnter" @leave="normalLeave" @after-leave="normalAfterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img class="img" :src="currentSong.image" alt="">
        </div>
        <div class="top">
          <div class="back" @click="shrink">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdState">
                <img :src="currentSong.image" alt="" class="image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{formatTime(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent"></progress-bar>
            </div>
            <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="prevSong" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="nextSong" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="expand">
        <div class="icon">
          <img class="img" :class="cdState" :src="currentSong.image" alt="">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i @click.stop="togglePlaying" :class="miniIcon"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import {
  SET_FULL_SCREEN,
  SET_CURRENT_SONG_URL,
  SET_PLAYING,
  SET_CURRENT_INDEX,
} from '@/store/types';
import animations from 'create-keyframe-animation';
import { prefixStyle } from '@/assets/js/dom';
import { ERR_OK } from '@/api/config';
import songApi from '@/api/song';
import { format } from '@/assets/js/time';
import ProgressBar from '@/base/progress-bar/progress-bar.vue';

const transform = prefixStyle('transform');
const transition = prefixStyle('transition');
const animation = prefixStyle('animation');

@Component({
  components: {
    ProgressBar,
  },
})
export default class Player extends Vue {
  @State private fullScreen!: boolean;
  @State private playList!: Array<any>;
  @State private playing!: boolean;
  @State private currentIndex!: number;
  @Getter private currentSong!: Music.Song;
  @Mutation private [SET_FULL_SCREEN]!: (fullScreen: boolean) => void;
  @Mutation private [SET_CURRENT_SONG_URL]!: (url: string) => void;
  @Mutation private [SET_PLAYING]!: (playing: boolean) => void;
  @Mutation private [SET_CURRENT_INDEX]!: (currentIndex: number) => void;

  private songReady: boolean = false;
  private currentTime: number = 0;

  $refs: any = {
    cdWrapper: HTMLElement,
  };

  shrink() {
    this.SET_FULL_SCREEN(false);
  }
  expand() {
    this.SET_FULL_SCREEN(true);
  }
  normalEnter(el: HTMLElement, done: Function) {
    const { x, y, scale } = this.getPosAndScale();
    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: 'move',
      animation: animation,
      presets: {
        duration: 400,
        easing: 'linear',
      },
    });
    animations.runAnimation(this.$refs.cdWrapper, 'move', done);
  }
  normalAfterEnter() {
    animations.unregisterAnimation('move');
    this.$refs.cdWrapper.style[animation] = '';
  }
  normalLeave(el: HTMLElement, done: Function) {
    this.$refs.cdWrapper.style[transition] = 'all 0.4s';
    const { x, y, scale } = this.getPosAndScale();
    this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    this.$refs.cdWrapper.addEventListener('transitionend', done);
  }
  normalAfterLeave() {
    this.$refs.cdWrapper.style[transition] = '';
    this.$refs.cdWrapper.style[transform] = '';
  }
  getPosAndScale() {
    const targetWidth = 40;
    const paddingLeft = 40;
    const iconCenterToBottomDist = 30;
    const cdTop = 80;
    const cdWidth = window.innerWidth * 0.8;
    const scale = targetWidth / cdWidth;
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - cdTop - cdWidth / 2 - iconCenterToBottomDist;
    return {
      x,
      y,
      scale,
    };
  }
  togglePlaying() {
    if (!this.songReady) return;
    this.SET_PLAYING(!this.playing);
  }
  prevSong() {
    if (!this.songReady) return;
    let index = this.currentIndex - 1;
    if (index === -1) {
      index = this.playList.length - 1;
    }
    this.SET_CURRENT_INDEX(index);
    if (!this.playing) {
      this.togglePlaying();
    }
    this.songReady = false;
  }
  nextSong() {
    if (!this.songReady) return;
    let index = this.currentIndex + 1;
    if (index === this.playList.length) {
      index = 0;
    }
    this.SET_CURRENT_INDEX(index);
    if (!this.playing) {
      this.togglePlaying();
    }
    this.songReady = false;
  }
  ready() {
    this.songReady = true;
  }
  error() {
    this.songReady = true;
  }
  updateTime(event: any) {
    this.currentTime = event.target.currentTime;
  }
  formatTime(time: number) {
    return format(time);
  }

  @Watch('currentSong')
  async onCurrentSongChanged(song: Music.Song) {
    const t = new Date().getUTCMilliseconds();
    const guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
    const vKeyData = await songApi.getSongVKey(guid, song.mid);
    let vKey = '';
    if (vKeyData.code == ERR_OK) {
      vKey = vKeyData.data.items[0].vkey;
    }
    const url = `http://dl.stream.qqmusic.qq.com/C400${
      song.mid
    }.m4a?vkey=${vKey}&guid=${guid}&uin=0&fromtag=66`;
    this.SET_CURRENT_SONG_URL(url);
    this.$nextTick(() => {
      this.$refs.audio.play();
    });
  }

  @Watch('playing')
  onPlayingChanged(playing: boolean) {
    const audio = this.$refs.audio;
    if (audio.networkState !== 0 && audio.networkState !== 3) {
      playing ? audio.play() : audio.pause();
    }
  }

  get playIcon() {
    return this.playing ? 'icon-pause' : 'icon-play';
  }
  get miniIcon() {
    return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
  }
  get cdState() {
    return this.playing ? 'play' : 'play pause';
  }
  get disableCls() {
    return this.songReady ? '' : 'disable';
  }
  get percent() {
    return this.currentTime / this.currentSong.duration;
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";
@import "~@/assets/stylus/mixin";

.player
  .normal-player
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      opacity: 0.6
      filter: blur(20px)
      .img
        width: 100%;
        height: 100%;
        display: block
    .top
      position: relative
      margin-bottom: 25px
      .back
        position absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 9px
          font-size: $font-size-large-x
          color: $color-theme
          transform: rotate(-90deg)
      .title
        width: 70%
        margin: 0 auto
        line-height: 40px
        text-align: center
        no-wrap()
        font-size: $font-size-large
        color: $color-text
      .subtitle
        line-height: 20px
        text-align: center
        font-size: $font-size-medium
        color: $color-text
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 10px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%
        .playing-lyric-wrapper
          width: 80%
          margin: 30px auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric
            height: 20px
            line-height: 20px
            font-size: $font-size-medium
            color: $color-text-l
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text-l
            font-size: $font-size-medium
            &.current
              color: $color-text
    .bottom
      position: absolute
      bottom: 50px
      width: 100%
      .dot-wrapper
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          vertical-align: middle
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: $color-text-l
          &.active
            width: 20px
            border-radius: 5px
            background: $color-text-ll
      .progress-wrapper
        display: flex
        align-items: center
        width: 80%
        margin: 0px auto
        padding: 10px 0
        .time
          color: $color-text
          font-size: $font-size-small
          flex: 0 0 30px
          line-height: 30px
          width: 30px
          &.time-l
            text-align: left
          &.time-r
            text-align: right
        .progress-bar-wrapper
          flex: 1
      .operators
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 20px
          text-align: center
          i
            font-size: 40px
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity: 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
    .icon
      flex: 0 0 40px
      width: 40px
      padding: 0 10px 0 20px
      .img
        width: 40px
        height: 40px
        display: block
        border-radius: 50%
        &.play
          animation: rotate 10s linear infinite
        &.pause
          animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        no-wrap()
        font-size: $font-size-medium
        color: $color-text
      .desc
        no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 30px
        color: $color-theme-d
      .icon-mini
        font-size: 32px
        position: absolute
        left: 0
        top: 0
@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
