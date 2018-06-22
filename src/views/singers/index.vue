<template>
  <div class="singers">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import singerApi from '@/api/singer';
import { ERR_OK } from '@/api/config';

const HOT_NAME = '热门';
const HOT_SINGER_LENGTH = 10;

@Component
export default class Singers extends Vue {
  singers = [];

  async getSingers() {
    const response = await singerApi.getSingers();
    if (response.code === ERR_OK) {
      this.singers = response.data.list;
    } else {
      console.log(response);
    }
  }

  normalizeSingers(list: Array<any>) {
    let map = {
      hot: {
        title: HOT_NAME,
        items: [],
      },
    };
    list.forEach((item, index) => {
      // if (index < HOT_SINGER_LENGTH) {
      //   map.hot.items.push({
      //     id: item.Fsinger_id,
      //     name: item.Fsinger_name,
      //     avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
      //   });
      // }
    });
  }

  async created() {
    await this.getSingers();
  }
}
</script>

<style lang="stylus" scoped>
.singers
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
