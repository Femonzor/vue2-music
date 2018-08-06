import storage from 'good-storage';

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

// compare is callback function, cannot find suitable type, so use any
const insertArray = (array: Array<any>, val: any, compare: any, maxLen: number) => {
  const index = array.findIndex(compare);
  if (index === 0) return;
  if (index > 0) array.splice(index, 1);
  array.unshift(val);
  if (maxLen && array.length > maxLen) array.pop();
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
