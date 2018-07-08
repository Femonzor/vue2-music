<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import api from '@/api/singer';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/assets/js/song';

@Component
export default class Singer extends Vue {
  @Getter private singer!: Music.Singer;
  private songs!: Music.Song[];
  async getSinger() {
    if (!this.singer.id) {
      this.$router.push('/singers');
      return;
    }
    const response = await api.getSinger(this.singer.id);
    if (response.code === ERR_OK) {
      this.songs = this.normalizeSongs(response.data.list);
      console.log(this.songs);
    } else {
      console.log(response);
    }
  }

  normalizeSongs(list: Array<any>) {
    let ret: Array<Music.Song> = [];
    list.forEach(item => {
      let { musicData } = item;
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData));
      }
    });
    return ret;
  }

  async created() {
    await this.getSinger();
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';

.singer-detail
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 100
  background: $color-background
.slide-enter-active,
.slide-leave-active
  transition: all .3s
.slide-enter,
.slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
