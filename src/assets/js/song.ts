import songApi from '@/api/song';
import { ERR_OK } from '@/api/config';
import { Base64 } from 'js-base64';

export default class Song {
  id: string;
  mid: string;
  singer: string;
  name: string;
  album: string;
  duration: number;
  image: string;
  url: string;
  lyric: string;
  constructor(obj: any) {
    this.id = obj.id;
    this.mid = obj.mid;
    this.singer = obj.singer;
    this.name = obj.name;
    this.album = obj.album;
    this.duration = obj.duration;
    this.image = obj.image;
    this.url = obj.url;
    this.lyric = obj.lyric;
  }

  async getLyric() {
    if (this.lyric) return this.lyric;
    const response = await songApi.getLyric(this.mid);
    if (response.retcode === ERR_OK) {
      return Base64.decode(response.lyric);
    }
  }
}

export const createSong = (musicData: any): Song => {
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
    url: '',
    lyric: '',
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
