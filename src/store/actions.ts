import { ActionTree } from 'vuex';
import * as types from '@/store/types';
import { PlayMode } from '@/assets/js/config';
import { shuffle } from '@/assets/js/util';

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
};

export default actions;
