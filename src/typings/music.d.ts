declare namespace Music {
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

  export interface TouchMove {
    y1: number,
    y2: number,
    anchorIndex: number,
  }
}
