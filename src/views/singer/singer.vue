<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import singerApi from '@/api/singer';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';
import MusicList from '@/components/music-list/music-list.vue';

@Component({
  components: {
    MusicList,
  },
})
export default class Singer extends Vue {
  @State private singer!: Music.Singer;

  private songs: Array<Song> = [];

  async getSinger() {
    if (!this.singer.id) {
      this.$router.push('/singers');
      return;
    }
    const response = await singerApi.getSinger(this.singer.id);
    if (response.code === ERR_OK) {
      this.songs = this.normalizeSongs(response.data.list);
    } else {
      console.log(response);
    }
  }

  normalizeSongs(list: Array<any>) {
    const result: Array<Song> = [];
    list.forEach(item => {
      let { musicData } = item;
      if (musicData.songid && musicData.albummid) {
        result.push(createSong(musicData));
      }
    });
    return result;
  }

  async created() {
    await this.getSinger();
  }

  get title() {
    return this.singer.name;
  }
  get bgImage() {
    return this.singer.avatar;
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";

.slide-enter-active,
.slide-leave-active
  transition: all .3s
.slide-enter,
.slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
