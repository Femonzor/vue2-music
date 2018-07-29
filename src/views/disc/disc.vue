<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MusicList from '@/components/music-list/music-list.vue';
import { State } from 'vuex-class';
import recommendApi from '@/api/recommend';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';

@Component({
  components: {
    MusicList,
  },
})
export default class Disc extends Vue {
  @State private disc!: any;

  private songs: Array<Song> = [];

  async getSongList() {
    if (!this.disc.dissid) {
      this.$router.push('/recommends');
      return;
    }
    const response = await recommendApi.getSongList(this.disc.dissid);
    if (response.code === ERR_OK) {
      this.songs = this.normalizeSongs(response.cdlist[0].songlist);
    } else {
      console.log(response);
    }
  }
  normalizeSongs(list: Array<any>) {
    let result: Array<Song> = [];
    list.forEach(item => {
      if (item.songid && item.albumid) {
        result.push(createSong(item));
      }
    });
    return result;
  }

  get title() {
    return this.disc.dissname;
  }
  get bgImage() {
    return this.disc.imgurl;
  }

  async created() {
    await this.getSongList();
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';

.slide-enter-active,
.slide-leave-active
  transition: all 0.3s
.slide-enter,
.slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
