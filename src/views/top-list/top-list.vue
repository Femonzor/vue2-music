<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>  
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MusicList from '@/components/music-list/music-list.vue';
import { State } from 'vuex-class';
import rankApi from '@/api/rank';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';

@Component({
  components: {
    MusicList,
  },
})
export default class TopList extends Vue {
  @State private topList!: any;

  private rank: boolean = true;
  private songs: Array<Song> = [];

  async getMusicList() {
    if (!this.topList.id) {
      this.$router.push('/rank');
      return;
    }
    const response = await rankApi.getMusicList(this.topList.id);
    if (response.code === ERR_OK) {
      this.songs = this.normalizeSongs(response.songlist);
    } else {
      console.log(response);
    }
  }
  normalizeSongs(list: Array<any>) {
    const result: Array<Song> = [];
    list.forEach(item => {
      const musicData = item.data;
      if (musicData.songid && musicData.albumid) {
        result.push(createSong(musicData));
      }
    });
    return result;
  }

  get title() {
    return this.topList.topTitle;
  }
  get bgImage() {
    if (this.songs.length) return this.songs[0].image;
    return '';
  }

  async created() {
    await this.getMusicList();
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/stylus/variable";

.slide-enter-active,
.slide-leave-active
  transition: all 0.3s
.slide-enter,
.slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
