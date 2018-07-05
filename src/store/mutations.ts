import * as types from '@/store/types';

const mutations = {
  [types.SET_SINGER](state: Music.State, singer: Music.Singer) {
    state.singer = singer;
  },
};

export default mutations;
