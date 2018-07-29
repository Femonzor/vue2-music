<template>
  <div class="rank">
    <div class="toplist">
      <ul>
        <li class="item">
          <div class="icon">
            <img src="" alt="" class="img">
          </div>
          <ul class="song-list">
            <li class="song">
              <span></span>
              <span></span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import rankApi from '@/api/rank';
import { ERR_OK } from '@/api/config';

@Component
export default class Rank extends Vue {
  async getTopList() {
    const response = await rankApi.getTopList();
    if (response.code === ERR_OK) {
      console.log(response.data.topList);
    } else {
      console.log(response);
    }
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
