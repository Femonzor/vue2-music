import storage from 'good-storage';

const SEARCH_KEY = '__search__';
const PLAY_KEY = '__play__';
const FAVORITE_KEY = '__favorite__';
const SEARCH_MAX_LENGTH = 15;
const PLAY_MAX_LENGTH = 200;
const FAVORITE_MAX_LENGTH = 200;

// compare is callback function, cannot find suitable type, so use any
const insertArray = (array: Array<any>, val: any, compare: any, maxLen: number) => {
  const index = array.findIndex(compare);
  if (index === 0) return;
  if (index > 0) array.splice(index, 1);
  array.unshift(val);
  if (maxLen && array.length > maxLen) array.pop();
};

const deleteFromArray = (array: Array<any>, compare: any) => {
  const index = array.findIndex(compare);
  if (index > -1) array.splice(index, 1);
};

export const saveSearch = (query: string) => {
  let searches = storage.get(SEARCH_KEY, []);
  insertArray(searches, query, (item: any) => item === query, SEARCH_MAX_LENGTH);
  storage.set(SEARCH_KEY, searches);
  return searches;
};

export const loadSearch = () => {
  return storage.get(SEARCH_KEY, []);
};

export const deleteSearch = (query: string) => {
  let searches = storage.get(SEARCH_KEY, []);
  deleteFromArray(searches, (item: any) => item === query);
  storage.set(SEARCH_KEY, searches);
  return searches;
};

export const clearSearch = () => {
  storage.remove(SEARCH_KEY);
  return [];
};

export const savePlay = (song: Song) => {
  let songs = storage.get(PLAY_KEY, []);
  insertArray(songs, song, (item: any) => item.id === song.id, PLAY_MAX_LENGTH);
  storage.set(PLAY_KEY, songs);
  return songs;
};

export const loadPlay = () => {
  return storage.get(PLAY_KEY, []);
};

export const saveFavorite = (song: Song) => {
  let songs = storage.get(FAVORITE_KEY, []);
  insertArray(songs, song, (item: any) => item.id === song.id, FAVORITE_MAX_LENGTH);
  storage.set(FAVORITE_KEY, songs);
  return songs;
};

export const deleteFavorite = (song: Song) => {
  let songs = storage.get(FAVORITE_KEY, []);
  deleteFromArray(songs, (item: any) => item.id === song.id);
  storage.set(FAVORITE_KEY, songs);
  return songs;
};

export const loadFavorite = () => {
  return storage.get(FAVORITE_KEY, []);
};
