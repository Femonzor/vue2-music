import { ActionTree } from 'vuex';
import * as types from '@/store/types';
import { PlayMode } from '@/assets/js/config';
import { shuffle } from '@/assets/js/util';
import { saveSearch, deleteSearch, clearSearch, savePlay } from '@/assets/js/cache';

const findIndex = (list: Array<any>, song: any) => {
  return list.findIndex(item => {
    return item.id === song.id;
  });
};

const actions: ActionTree<Music.State, any> = {
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
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
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
    let currentSIndex = findIndex(sequenceList, currentSong) + 1;
    let fsIndex = findIndex(sequenceList, song);
    sequenceList.splice(currentSIndex, 0, song);
    if (fsIndex > -1) {
      if (currentSIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1);
      } else {
        sequenceList.splice(fsIndex + 1, 1);
      }
    }
    commit(types.SET_PLAY_LIST, playList);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING, true);
  },
  deleteSong({ state, commit }, song) {
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    let pIndex = findIndex(playList, song);
    playList.splice(pIndex, 1);
    let sIndex = findIndex(sequenceList, song);
    sequenceList.splice(sIndex, 1);
    if (currentIndex > pIndex || currentIndex === playList.length) {
      currentIndex--;
    }
    commit(types.SET_PLAY_LIST, playList);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    const playing = playList.length > 0;
    commit(types.SET_PLAYING, playing);
  },
  deleteSongList({ commit }) {
    commit(types.SET_PLAY_LIST, []);
    commit(types.SET_SEQUENCE_LIST, []);
    commit(types.SET_CURRENT_INDEX, -1);
    commit(types.SET_PLAYING, false);
  },
  saveSearchHistory({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query));
  },
  deleteSearchHistory({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
  },
  clearSearchHistory({ commit }) {
    commit(types.SET_SEARCH_HISTORY, clearSearch());
  },
  savePlayHistory({ commit }, song) {
    commit(types.SET_PLAY_HISTORY, savePlay(song));
  },
};

export default actions;
