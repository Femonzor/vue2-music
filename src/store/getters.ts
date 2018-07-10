import { GetterTree } from 'vuex';

// export const singer = (state: Music.State) => state.singer;
// export const playing = (state: Music.State) => state.playing;
// export const fullScreen = (state: Music.State) => state.fullScreen;
// export const playList = (state: Music.State) => state.playList;
// export const sequenceList = (state: Music.State) => state.sequenceList;
// export const mode = (state: Music.State) => state.mode;
// export const currentIndex = (state: Music.State) => state.currentIndex;
// export const currentSong = (state: Music.State) => state.playList[state.currentIndex] || {};

const getters: GetterTree<any, any> = {
  singer(state) {
    return state.singer;
  },
  playing(state) {
    return state.playing;
  },
  fullScreen(state) {
    return state.fullScreen;
  },
  playList(state) {
    return state.playList;
  },
  sequenceList(state) {
    return state.sequenceList;
  },
  mode(state) {
    return state.mode;
  },
  currentIndex(state) {
    return state.currentIndex;
  },
  currentSong(state) {
    return state.playList[state.currentIndex] || {};
  },
};

export default getters;
