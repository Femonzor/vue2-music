import { Component, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export class playListMixin extends Vue {
  @State private playList!: Array<any>;

  mounted() {
    this.handlePlayList(this.playList);
  }
  activated() {
    this.handlePlayList(this.playList);
  }

  handlePlayList(playList: Array<any>) {
    throw new Error('component must implement handlePlayList method');
  }

  @Watch('playList')
  onPlayListChanged(playList: Array<any>) {
    this.handlePlayList(playList);
  }
}
