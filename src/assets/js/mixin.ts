import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Mutation, Getter, Action } from 'vuex-class';
import { PlayMode } from '@/assets/js/config';
import { shuffle } from '@/assets/js/util';
import { SET_CURRENT_INDEX, SET_PLAY_MODE, SET_PLAY_LIST } from '@/store/types';

@Component
export class PlayListMixin extends Vue {
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
export class PlayerMixin extends Vue {
  @State public mode!: number;
  @State public sequenceList!: Array<any>;
  @State public favoriteList!: Array<any>;
  @Getter public currentSong!: Song;
  @Mutation public [SET_CURRENT_INDEX]!: (currentIndex: number) => void;
  @Mutation public [SET_PLAY_MODE]!: (mode: PlayMode) => void;
  @Mutation public [SET_PLAY_LIST]!: (playList: Array<any>) => void;
  @Action saveFavoriteLIst!: (song: any) => void;
  @Action deleteFavoriteList!: (song: any) => void;

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
  getFavoriteIcon(song: Song) {
    if (this.isFavorite(song)) return 'icon-favorite';
    return 'icon-not-favorite';
  }
  toggleFavorite(song: Song) {
    if (this.isFavorite(song)) {
      this.deleteFavoriteList(song);
    } else {
      this.saveFavoriteLIst(song);
    }
  }
  isFavorite(song: Song) {
    const index = this.favoriteList.findIndex((item: Song) => item.id === song.id);
    return index > -1;
  }

  get iconMode() {
    return this.mode === PlayMode.Sequence
      ? 'icon-sequence'
      : this.mode === PlayMode.Loop
        ? 'icon-loop'
        : 'icon-random';
  }
}

@Component
export class SearchMixin extends Vue {
  @State public searchHistory!: Array<any>;
  @Action saveSearchHistory!: (query: string) => void;
  @Action deleteSearchHistory!: (query: string) => void;

  public query: string = '';

  queryChange(query: string) {
    this.query = query;
  }
  saveSearch() {
    this.saveSearchHistory(this.query);
  }
}
