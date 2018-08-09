declare class Song {
  id: string;
  mid: string;
  singer: string;
  name: string;
  album: string;
  duration: number;
  image: string;
  url: string;
  lyric: string;
  constructor(obj: Song);
  getLyric(): Promise<any>;
}

declare namespace Music {
  export interface ProgressTouch {
    initiated: boolean,
    startX: number,
    left: number,
  }

  export interface State {
    singer: Singer,
    playing: boolean,
    fullScreen: boolean,
    playList: Array<any>,
    sequenceList: Array<any>,
    mode: number,
    currentIndex: number,
    disc: any,
    topList: any,
    searchHistory: Array<any>,
    playHistory: Array<any>,
  }

  export interface Singer {
    id: string,
    name: string,
    avatar: string,
  }

  export interface SingerGroup {
    title: string,
    items: Singer[],
  }

  export interface SingerMap {
    [index: string]: SingerGroup,
  }

  export interface Switch {
    name: string,
  }
}
