import * as types from '@/store/types';

const mutations = {
  [types.SET_SINGER](state: Music.State, singer: Music.Singer) {
    state.singer = singer;
  },
  [types.SET_PLAYING](state: Music.State, playing: boolean) {
    state.playing = playing;
  },
  [types.SET_FULL_SCREEN](state: Music.State, fullScreen: boolean) {
    state.fullScreen = fullScreen;
  },
  [types.SET_PLAY_LIST](state: Music.State, playList: Array<any>) {
    state.playList = playList;
  },
  [types.SET_SEQUENCE_LIST](state: Music.State, sequenceList: Array<any>) {
    state.sequenceList = sequenceList;
  },
  [types.SET_PLAY_MODE](state: Music.State, mode: Music.PlayMode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state: Music.State, currentIndex: number) {
    state.currentIndex = currentIndex;
  },
};

export default mutations;
