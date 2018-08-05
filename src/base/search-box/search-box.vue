<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" class="box" :placeholder="placeholder" v-model="query" ref="query">
    <i v-show="query" class="icon-dismiss" @click="clearInput"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { debounce } from '@/assets/js/util';

@Component
export default class SearchBox extends Vue {
  @Prop({ default: '搜索歌曲、歌手' })
  private placeholder!: string;

  private query: string = '';

  $refs!: {
    query: HTMLInputElement;
  };

  clearInput() {
    this.query = '';
  }
  setQuery(query: string) {
    this.query = query;
  }
  blur() {
    this.$refs.query.blur();
  }

  created() {
    this.$watch(
      'query',
      debounce((newQuery: string) => {
        this.$emit('query', newQuery);
      }, 200),
    );
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";

.search-box
  display: flex
  align-items: center
  box-sizing: border-box
  width: 100%
  padding: 0 6px
  height: 40px
  background: $color-highlight-background
  border-radius: 6px
  .icon-search
    font-size: 24px
    color: $color-background
  .box
    flex: 1
    margin: 0 5px
    line-height: 18px
    background: $color-highlight-background
    color: $color-text
    font-size: $font-size-medium
    &::placeholder
      color: $color-text-d
  .icon-dismiss
    font-size: 16px
    color: $color-background
</style>
