import { GetterTree } from 'vuex';

const getters: GetterTree<any, any> = {
  currentSong(state) {
    return state.playList[state.currentIndex] || {};
  },
};

export default getters;
