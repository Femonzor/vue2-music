export default class Song {
  id: string;
  mid: string;
  singer: string;
  name: string;
  album: string;
  duration: number;
  image: string;
  url: string;
  constructor(obj: Music.Song) {
    this.id = obj.id;
    this.mid = obj.mid;
    this.singer = obj.singer;
    this.name = obj.name;
    this.album = obj.album;
    this.duration = obj.duration;
    this.image = obj.image;
    this.url = obj.url;
  }
}

export const createSong = (musicData: any): Song => {
  // const t = new Date().getUTCMilliseconds();
  // const guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
  // const vKeyData = await songApi.getSongVKey(guid, musicData.songmid);
  // let vKey = '';
  // if (vKeyData.code == ERR_OK) {
  //   vKey = vKeyData.data.items[0].vkey;
  // }
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`,
    // url: `http://dl.stream.qqmusic.qq.com/C400${
    //   musicData.songmid
    // }.m4a?vkey=${vKey}&guid=${guid}&uin=0&fromtag=66`,
    url: '',
  });
};

const filterSinger = (singers: Array<any>) => {
  let ret: Array<string> = [];
  if (!singers) return '';
  singers.forEach(singer => {
    ret.push(singer.name);
  });
  return ret.join('/');
};
