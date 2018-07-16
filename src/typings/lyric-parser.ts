declare module 'lyric-parser' {
  export default class Lyric {
    constructor(lrc: string);
    constructor(lrc: string, handler: Function);
  }
}
