import { loadSearch, loadPlay, loadFavorite } from '@/assets/js/cache';
import { PlayMode } from '@/assets/js/config';

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
  mode: PlayMode.Sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite(),
};

export default state;
