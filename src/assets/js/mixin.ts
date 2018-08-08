import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Mutation, Getter } from 'vuex-class';
import { PlayMode } from '@/assets/js/config';
import { shuffle } from '@/assets/js/util';
import { SET_CURRENT_INDEX, SET_PLAY_MODE, SET_PLAY_LIST } from '@/store/types';

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

@Component
export class playerMixin extends Vue {
  @State public mode!: number;
  @State public sequenceList!: Array<any>;
  @Getter public currentSong!: Song;
  @Mutation public [SET_CURRENT_INDEX]!: (currentIndex: number) => void;
  @Mutation public [SET_PLAY_MODE]!: (mode: PlayMode) => void;
  @Mutation public [SET_PLAY_LIST]!: (playList: Array<any>) => void;

  changeMode() {
    const mode = (this.mode + 1) % 3;
    this.SET_PLAY_MODE(mode);
    let list = null;
    if (mode === PlayMode.Random) {
      list = shuffle(this.sequenceList);
    } else {
      list = this.sequenceList;
    }
    this.resetCurrentIndex(list);
    this.SET_PLAY_LIST(list);
  }
  resetCurrentIndex(list: Array<any>) {
    let index = list.findIndex((item: any) => item.id === this.currentSong.id);
    this.SET_CURRENT_INDEX(index);
  }

  get iconMode() {
    return this.mode === PlayMode.Sequence
      ? 'icon-sequence'
      : this.mode === PlayMode.Loop
        ? 'icon-loop'
        : 'icon-random';
  }
}
