<template>
  <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="scroll" :beforeScroll="beforeScroll" @beforeScroll="listScroll">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result" :key="item.id">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="more" title=""></loading>
    </ul>
    <div v-show="!more && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import searchApi from '@/api/search';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';
import Scroll from '@/base/scroll/scroll.vue';
import Loading from '@/base/loading/loading.vue';
import NoResult from '@/base/no-result/no-result.vue';
import Singer from '@/assets/js/singer';
import { Mutation, Action } from 'vuex-class';
import { SET_SINGER } from '@/store/types';

const TYPE_SINGER = 'singer';
const PER_PAGE = 50;

@Component({
  components: {
    Scroll,
    Loading,
    NoResult,
  },
})
export default class Suggest extends Vue {
  @Mutation private [SET_SINGER]!: (singer: Music.Singer) => void;

  @Prop({ default: '' })
  private query!: string;
  @Prop({ default: true })
  private showSinger!: boolean;

  @Action insertSong!: (obj: any) => void;

  private page: number = 1;
  private result: Array<any> = [];
  private pullup: boolean = true;
  private more: boolean = true;
  private beforeScroll: boolean = true;

  $refs!: {
    scroll: Scroll;
  };

  @Watch('query')
  async onQueryChanged() {
    await this.search();
  }

  async search() {
    this.page = 1;
    this.more = true;
    const response = await searchApi.search(this.query, this.page, this.showSinger, PER_PAGE);
    if (response.code === ERR_OK) {
      this.result = this.normalizeResult(response.data);
      this.$refs.scroll.scrollTo(0, 0, 0);
      this.checkMore(response.data);
    } else {
      console.log(response);
    }
  }
  async searchMore() {
    if (!this.more) return;
    const response = await searchApi.search(this.query, ++this.page, this.showSinger, PER_PAGE);
    if (response.code === ERR_OK) {
      this.result = this.result.concat(this.normalizeResult(response.data));
      this.checkMore(response.data);
    } else {
      console.log(response);
    }
  }
  normalizeResult(data: any) {
    let result = [];
    if (data.zhida && data.zhida.singerid) {
      result.push({
        ...data.zhida,
        ...{
          type: TYPE_SINGER,
        },
      });
    }
    if (data.song) {
      result = result.concat(this.normalizeSongs(data.song.list));
    }
    return result;
  }
  normalizeSongs(list: Array<any>) {
    const result: Array<any> = [];
    list.forEach(musicData => {
      if (musicData.songid && musicData.albumid) {
        result.push(createSong(musicData));
      }
    });
    return result;
  }
  listScroll() {
    this.$emit('listScroll');
  }
  checkMore(data: any) {
    const { song } = data;
    if (!song.list.length || song.curnum + song.curpage * PER_PAGE > song.totalnum) {
      this.more = false;
    }
  }
  getIconClass(item: any) {
    if (item.type === TYPE_SINGER) {
      return 'icon-mine';
    } else {
      return 'icon-music';
    }
  }
  getDisplayName(item: any) {
    if (item.type === TYPE_SINGER) {
      return item.singername;
    } else {
      return `${item.name}-${item.singer}`;
    }
  }
  selectItem(item: any) {
    if (item.type === TYPE_SINGER) {
      const singer = new Singer(item.singermid, item.singername);
      this.$router.push({
        path: `/search/${singer.id}`,
      });
      this.SET_SINGER(singer);
    } else {
      this.insertSong({
        song: item,
      });
    }
    this.$emit('select');
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";
@import "~@/assets/stylus/mixin";

.suggest
  height: 100%
  overflow: hidden
  .suggest-list
    padding: 0 30px
    .suggest-item
      display: flex
      align-items: center
      padding-bottom: 20px
    .icon
      flex: 0 0 30px
      width: 30px
      [class^="icon-"]
        font-size: 14px
        color: $color-text-d
    .name
      flex: 1
      font-size: $font-size-medium
      color: $color-text-d
      overflow: hidden
      .text
        no-wrap()
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
