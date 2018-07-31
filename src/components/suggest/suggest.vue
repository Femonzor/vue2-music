<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" :key="(item.singermid || item.songmid) + item.type">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import searchApi from '@/api/search';
import { ERR_OK } from '@/api/config';
import { filterSinger } from '@/assets/js/song';

const TYPE_SINGER = 'singer';

@Component
export default class Suggest extends Vue {
  @Prop({ default: '' })
  private query!: string;
  @Prop({ default: true })
  private showSinger!: boolean;

  private page: number = 1;
  private result: Array<any> = [];

  @Watch('query')
  async onQueryChanged() {
    await this.search();
  }

  async search() {
    const response = await searchApi.search(this.query, this.page, this.showSinger);
    if (response.code === ERR_OK) {
      this.result = this.normalizeResult(response.data);
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
      result = result.concat(data.song.list);
    }
    return result;
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
      return `${item.songname}-${filterSinger(item.singer)}`;
    }
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
