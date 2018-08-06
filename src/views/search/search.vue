<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
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
            <span class="clear">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list :searches="searchHistory"></search-list>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest @select="saveSearch" :query="query" @listScroll="blurInput"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchBox from '@/base/search-box/search-box.vue';
import searchApi from '@/api/search';
import { ERR_OK } from '@/api/config';
import Suggest from '@/components/suggest/suggest.vue';
import { Action, State } from 'vuex-class';
import SearchList from '@/base/search-list/search-list.vue';

@Component({
  components: {
    SearchBox,
    Suggest,
    SearchList,
  },
})
export default class Search extends Vue {
  @State private searchHistory!: Array<any>;
  @Action saveSearchHistory!: (query: string) => void;

  private hotkey: Array<any> = [];
  private query: string = '';

  $refs!: {
    searchBox: SearchBox;
  };

  async getHotKey() {
    const response = await searchApi.getHotKey();
    if (response.code === ERR_OK) {
      this.hotkey = response.data.hotkey.slice(0, 10);
    } else {
      console.log(response);
    }
  }
  addQuery(query: string) {
    this.$refs.searchBox.setQuery(query);
  }
  onQueryChange(query: string) {
    this.query = query;
  }
  blurInput() {
    this.$refs.searchBox.blur();
  }
  saveSearch() {
    this.saveSearchHistory(this.query);
  }

  async created() {
    await this.getHotKey();
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
