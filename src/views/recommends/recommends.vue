<template>
  <div class="recommends">
    <scroll class="recommends-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="recommend in recommends" :key="recommend.id">
              <a :href="recommend.linkUrl">
                <img :src="recommend.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="disc in discs" :key="disc.dissid" class="item">
              <div class="icon">
                <img v-lazy="disc.imgurl" :alt="disc.dissname" style="width:60px;height:60px;">
              </div>
              <div class="text">
                <h2 class="name" v-html="disc.creator.name"></h2>
                <p class="desc" v-html="disc.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-show="!discs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Slider from '@/base/slider/slider.vue';
import Scroll from '@/base/scroll/scroll.vue';
import Loading from '@/base/loading/loading.vue';
import recommendApi from '@/api/recommend';
import { ERR_OK } from '@/api/config';

@Component({
  components: {
    Slider,
    Scroll,
    Loading,
  },
})
export default class Recommends extends Vue {
  private recommends = [];
  private discs = [];
  async getRecommends() {
    const response = await recommendApi.getRecommends();
    if (response.code === ERR_OK) {
      this.recommends = response.data.slider;
    } else {
      console.log(response);
    }
  }

  async getDiscsByTag() {
    const response = await recommendApi.getDiscsByTag();
    if (response.code === ERR_OK) {
      this.discs = response.data.list;
    } else {
      console.log(response);
    }
  }

  async created() {
    await this.getRecommends();
    await this.getDiscsByTag();
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';
@import '~@/assets/stylus/mixin';

.recommends
  position: fixed
  width: 100%
  top: 88px
  bottom: 0

  .recommends-content
    height: 100%
    overflow: hidden

    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden

    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme

      .item
        display: flex
        align-items: center
        box-sizing: border-box
        padding: 0 20px 20px 20px

        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px

        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium

          .name
            margin-bottom: 10px
            color: $color-text

          .desc
            color: $color-text-d

    .loading-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
