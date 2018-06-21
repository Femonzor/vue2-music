<template>
  <div class="singers">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import singerApi from '@/api/singer';
import { ERR_OK } from '@/api/config';

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
