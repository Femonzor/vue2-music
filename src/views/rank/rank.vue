<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="scroll">
      <ul>
        <li class="item" v-for="item in topList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img src="" alt="" class="img" v-lazy="item.picUrl">
          </div>
          <ul class="song-list">
            <li class="song" v-for="(song, index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import rankApi from '@/api/rank';
import { ERR_OK } from '@/api/config';
import Scroll from '@/base/scroll/scroll.vue';
import Loading from '@/base/loading/loading.vue';
import { PlayListMixin } from '@/assets/js/mixin';
import { Mutation } from 'vuex-class';
import { SET_TOP_LIST } from '@/store/types';

@Component({
  components: {
    Scroll,
    Loading,
  },
})
export default class Rank extends Mixins(PlayListMixin) {
  @Mutation private [SET_TOP_LIST]!: (topList: any) => void;

  private topList: Array<any> = [];

  $refs!: {
    rank: HTMLDivElement;
    scroll: Scroll;
  };

  async getTopList() {
    const response = await rankApi.getTopList();
    if (response.code === ERR_OK) {
      this.topList = response.data.topList;
    } else {
      console.log(response);
    }
  }
  handlePlayList(playList: Array<any>) {
    const bottom = playList.length ? '60px' : '';
    this.$refs.rank.style.bottom = bottom;
    this.$refs.scroll.refresh();
  }
  selectItem(item: any) {
    this.$router.push({
      path: `/rank/${item.id}`,
    });
    this.SET_TOP_LIST(item);
  }

  async created() {
    await this.getTopList();
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";
@import "~@/assets/stylus/mixin";

.rank
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .toplist
    height: 100%
    overflow: hidden
    .item
      display: flex
      margin: 0 20px
      padding-top: 20px
      height: 100px
      &:last-child
        padding-bottom: 20px
      .icon
        flex: 0 0 100px
        width: 100px
        height: 100px
        .img
          width: 100px
          height: 100px
      .song-list
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0 20px
        height: 100px
        overflow: hidden
        background: $color-highlight-background
        color: $color-text-d
        font-size: $font-size-small
        .song
          no-wrap()
          line-height: 26px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
