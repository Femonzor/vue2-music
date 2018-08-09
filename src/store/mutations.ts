import * as types from '@/store/types';
import { MutationTree } from 'vuex';
import { PlayMode } from '@/assets/js/config';

const mutations: MutationTree<any> = {
  [types.SET_SINGER](state: Music.State, singer: Music.Singer): void {
    state.singer = singer;
  },
  [types.SET_PLAYING](state: Music.State, playing: boolean): void {
    state.playing = playing;
  },
  [types.SET_FULL_SCREEN](state: Music.State, fullScreen: boolean): void {
    state.fullScreen = fullScreen;
  },
  [types.SET_PLAY_LIST](state: Music.State, playList: Array<any>): void {
    state.playList = playList;
  },
  [types.SET_SEQUENCE_LIST](state: Music.State, sequenceList: Array<any>): void {
    state.sequenceList = sequenceList;
  },
  [types.SET_PLAY_MODE](state: Music.State, mode: PlayMode): void {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state: Music.State, currentIndex: number): void {
    state.currentIndex = currentIndex;
  },
  [types.SET_CURRENT_SONG_URL](state: Music.State, url: string): void {
    state.playList[state.currentIndex].url = url;
  },
  [types.SET_CURRENT_SONG_LYRIC](state: Music.State, lyric: string): void {
    state.playList[state.currentIndex].lyric = lyric;
  },
  [types.SET_DISC](state: Music.State, disc: any): void {
    state.disc = disc;
  },
  [types.SET_TOP_LIST](state: Music.State, topList: any): void {
    state.topList = topList;
  },
  [types.SET_SEARCH_HISTORY](state: Music.State, searchHistory: Array<any>): void {
    state.searchHistory = searchHistory;
  },
  [types.SET_PLAY_HISTORY](state: Music.State, playHistory: Array<any>): void {
    state.playHistory = playHistory;
  },
};

export default mutations;
