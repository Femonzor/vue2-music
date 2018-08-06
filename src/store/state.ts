import { loadSearch } from '@/assets/js/cache';

const state: Music.State = {
  singer: {
    id: '',
    name: '',
    avatar: '',
  },
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: 0,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
};

export default state;
