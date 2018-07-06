declare namespace Music {
  export interface State {
    singer: Singer,
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
