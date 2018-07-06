export default class Song{
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

export const createSong = (musicData: any) => {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
  })
};

const filterSinger = (singers: Array<any>) => {
  let ret: Array<string> = [];
  if (!singers) return '';
  singers.forEach(singer => {
    ret.push(singer.name);
  });
  return ret.join('/');
}
