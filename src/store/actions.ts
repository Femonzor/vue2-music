import { ActionTree } from 'vuex';
import * as types from '@/store/types';
import { PlayMode } from '@/assets/js/config';
import { shuffle } from '@/assets/js/util';

const findIndex = (list: Array<any>, song: any) => {
  return list.findIndex(item => {
    return item.id === song.id;
  });
};

const actions: ActionTree<any, any> = {
  selectPlay({ state, commit }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list);
    if (state.mode === PlayMode.Random) {
      let randomList = shuffle(list);
      commit(types.SET_PLAY_LIST, randomList);
      index = randomList.findIndex((item: any) => item.id === list[index].id);
    } else {
      commit(types.SET_PLAY_LIST, list);
    }
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING, true);
  },
  randomPlay({ commit }, { list }) {
    commit(types.SET_PLAY_MODE, PlayMode.Random);
    commit(types.SET_SEQUENCE_LIST, list);
    let randomList = shuffle(list);
    commit(types.SET_PLAY_LIST, randomList);
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING, true);
  },
  insertSong({ state, commit }, { song }) {
    let playList = state.playList;
    let sequenceList = state.sequenceList;
    let currentIndex = state.currentIndex;
    // record current song
    let currentSong = playList[currentIndex];
    let fpIndex = findIndex(playList, song);
    // add music, index plus 1
    playList.splice(++currentIndex, 0, song);
    if (fpIndex > -1) {
      if (currentIndex > fpIndex) {
        playList.splice(fpIndex, 1);
        currentIndex--;
      } else {
        playList.splice(fpIndex + 1, 1);
      }
    }
  }
};

export default actions;
