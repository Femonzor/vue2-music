<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="queryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll class="shortcut" :data="shortcut" ref="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotkey" :key="item.k">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="clearConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @select="addQuery" @delete="deleteSearch" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div ref="searchResult" class="search-result" v-show="query">
      <suggest ref="suggest" @select="saveSearch" :query="query" @listScroll="blurInput"></suggest>
    </div>
    <confirm ref="confirm" text="清空所有搜索历史？" @confirm="deleteAll"></confirm>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import SearchBox from '@/base/search-box/search-box.vue';
import searchApi from '@/api/search';
import { ERR_OK } from '@/api/config';
import Suggest from '@/components/suggest/suggest.vue';
import { Action, State } from 'vuex-class';
import SearchList from '@/base/search-list/search-list.vue';
import Confirm from '@/base/confirm/confirm.vue';
import Scroll from '@/base/scroll/scroll.vue';
import { setTimeout } from 'timers';
import { PlayListMixin, SearchMixin } from '@/assets/js/mixin';

@Component({
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll,
  },
})
export default class Search extends Mixins(PlayListMixin, SearchMixin) {
  @Action clearSearchHistory!: () => void;

  private hotkey: Array<any> = [];

  $refs!: {
    searchBox: SearchBox;
    confirm: Confirm;
    shortcut: Scroll;
    shortcutWrapper: HTMLDivElement;
    searchResult: HTMLDivElement;
    suggest: Suggest;
  };

  async getHotKey() {
    const response = await searchApi.getHotKey();
    if (response.code === ERR_OK) {
      this.hotkey = response.data.hotkey.slice(0, 10);
    } else {
      console.log(response);
    }
  }
  blurInput() {
    this.$refs.searchBox.blur();
  }
  addQuery(query: string) {
    this.$refs.searchBox.setQuery(query);
  }
  deleteSearch(item: string) {
    this.deleteSearchHistory(item);
  }
  deleteAll() {
    this.clearSearchHistory();
  }
  clearConfirm() {
    this.$refs.confirm.show();
  }
  handlePlayList(playList: Array<any>) {
    const bottom = playList.length ? '60px' : '';
    this.$refs.shortcutWrapper.style.bottom = bottom;
    this.$refs.shortcut.refresh();
    this.$refs.searchResult.style.bottom = bottom;
    this.$refs.suggest.refresh();
  }

  async created() {
    await this.getHotKey();
  }

  get shortcut() {
    return this.hotkey.concat(this.searchHistory);
  }

  @Watch('query')
  onQueryChange(newQuery: string) {
    if (!newQuery) {
      setTimeout(() => {
        this.$refs.shortcut.refresh();
      }, 20);
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";
@import "~@/assets/stylus/mixin";

.search
  .search-box-wrapper
    margin: 20px
  .shortcut-wrapper
    position: fixed
    top: 178px
    bottom: 0
    width: 100%
    .shortcut
      height: 100%
      overflow: hidden
      .hot-key
        margin: 0 20px 20px 20px
        .title
          margin-bottom: 20px
          font-size: $font-size-medium
          color: $color-text-l
        .item
          display: inline-block
          padding: 5px 10px
          margin: 0 20px 10px 0
          border-radius: 6px
          background: $color-highlight-background
          font-size: $font-size-medium
          color: $color-text-d
      .search-history
        position: relative
        margin: 0 20px
        .title
          display: flex
          align-items: center
          height: 40px
          font-size: $font-size-medium
          color: $color-text-l
          .text
            flex: 1
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
  .search-result
    position: fixed
    width: 100%
    top: 178px
    bottom: 0
</style>
