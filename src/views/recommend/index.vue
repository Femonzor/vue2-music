<template>
  <div class="recommend">
    <scroll class="recommend-content">
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
    </scroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Slider from '@/base/slider/index.vue';
import Scroll from '@/base/scroll/index.vue';
import recommendApi from '@/api/recommend';
import { ERR_OK } from '@/api/config';

@Component({
  components: {
    Slider,
    Scroll,
  },
})
export default class Recommend extends Vue {
  recommends = [];
  discs = [];
  async getRecommend() {
    const response = await recommendApi.getRecommend();
    if (response.code === ERR_OK) {
      this.recommends = response.data.slider;
    } else {
      console.log(response);
    }
  }

  async getDiscByTag() {
    const response = await recommendApi.getDiscByTag();
    if (response.code === ERR_OK) {
      this.discs = response.data.list;
    } else {
      console.log(response);
    }
  }

  async created() {
    await this.getRecommend();
    await this.getDiscByTag();
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';
@import '~@/assets/stylus/mixin';

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0

  .recommend-content
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

    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
