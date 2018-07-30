<template>
  <div class="singers" ref="singers">
    <list-view @select="selectSinger" :data="singers" ref="singerList"></list-view>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import singerApi from '@/api/singer';
import { ERR_OK } from '@/api/config';
import Singer from '@/assets/js/singer';
import ListView from '@/base/listview/listview.vue';
import { Mutation } from 'vuex-class';
import { SET_SINGER } from '@/store/types';
import { playListMixin } from '@/assets/js/mixin';

const HOT_NAME = '热门';
const HOT_SINGER_LENGTH = 10;

@Component({
  components: {
    ListView,
  },
  mixins: [playListMixin],
})
export default class Singers extends Vue {
  @Mutation private [SET_SINGER]!: (singer: Music.Singer) => void;

  private singers: Music.SingerGroup[] = [];

  $refs!: {
    singers: HTMLDivElement;
    singerList: ListView;
  };

  async getSingers() {
    const response = await singerApi.getSingers();
    if (response.code === ERR_OK) {
      this.singers = this.normalizeSingers(response.data.list);
    } else {
      console.log(response);
    }
  }
  normalizeSingers(list: Array<any>): Music.SingerGroup[] {
    let map: Music.SingerMap = {};
    map.hot = {
      title: HOT_NAME,
      items: [],
    };
    list.forEach((item, index) => {
      if (index < HOT_SINGER_LENGTH) {
        map.hot.items.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
      }
      const key = item.Findex;
      if (!map[key]) {
        map[key] = {
          title: key,
          items: [],
        };
      }
      map[key].items.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
    });
    let hotGroup = [];
    let otherGroup = [];
    const keys = Object.keys(map);
    for (let key of keys) {
      let val = map[key];
      if (val.title.match(/[a-zA-Z]/)) {
        otherGroup.push(val);
      } else if (key === 'hot') {
        hotGroup.push(val);
      }
    }
    otherGroup.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
    return hotGroup.concat(otherGroup);
  }
  selectSinger(singer: Music.Singer) {
    this.$router.push({
      path: `/singers/${singer.id}`,
    });
    this.SET_SINGER(singer);
  }
  handlePlayList(playList: Array<any>) {
    const bottom = playList.length ? '60px' : '';
    this.$refs.singers.style.bottom = bottom;
    this.$refs.singerList.refresh();
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
