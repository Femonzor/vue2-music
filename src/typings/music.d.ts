declare namespace Music {
  export enum PlayMode {
    Sequence = 0,
    Loop = 1,
    Random = 2,
  }

  export interface State {
    singer: Singer,
    playing: boolean,
    fullScreen: boolean,
    playList: Array<any>,
    sequenceList: Array<any>,
    mode: PlayMode,
    currentIndex: number,
  }

  export interface Singer {
    id: string,
    name: string,
    avatar: string,
  }

  export interface Song {
    id: string,
    mid: string,
    singer: string,
    name: string,
    album: string,
    duration: number,
    image: string,
    url: string,
  }

  export interface SingerGroup {
    title: string,
    items: Singer[],
  }

  export interface SingerMap {
    [index: string]: SingerGroup,
  }
}
