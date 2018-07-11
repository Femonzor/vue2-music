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
  currentSong(state) {
    return state.playList[state.currentIndex] || {};
  },
};

export default getters;
