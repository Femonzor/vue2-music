<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li @click="selectItem(item)" class="search-item" v-for="item in searches" :key="item">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteItem(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SearchList extends Vue {
  @Prop({ default: () => [] })
  private searches!: Array<any>;

  selectItem(item: string) {
    this.$emit('select', item);
  }
  deleteItem(item: string) {
    this.$emit('delete', item);
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";

.search-list
  .search-item
    display: flex
    align-items: center
    height: 40px
    overflow: hidden
    &.list-enter-active, &.list-leave-active
      transition: all 0.1s
    &.list-enter, &.list-leave-to
      height: 0
    .text
      flex: 1
      color: $color-text-l
    .icon
      extend-click()
      .icon-delete
        font-size: $font-size-small
        color: $color-text-d
</style>
