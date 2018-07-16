import { commonParams, options } from './config';
import axios from 'axios';

const getSongVKey = (guid: number, songMid: string): Promise<any> => {
  const url = '/api/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    cid: 205361747,
    uin: 0,
    songmid: songMid,
    filename: `C400${songMid}.m4a`,
    guid,
    format: 'json',
  });
  return axios
    .get(url, {
      params: data,
    })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
};

const getLyric = (songMid: string): Promise<any> => {
  const url = '/api/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  const data = Object.assign({}, commonParams, {
    songmid: songMid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 1840772130,
    format: 'json',
  });
  return axios
    .get(url, {
      params: data,
    })
    .then(response => {
      // qq music cannot return jsonp string instead of json string, don't know y
      let data = response.data;
      try {
        data = JSON.parse(data);
      } catch {
        data = /\w*\((.*)\)/g.exec(data);
        if (data && data.length === 2) {
          data = JSON.parse(data[1]);
        }
      }
      return Promise.resolve(data);
    })
    .catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
};

export default {
  getSongVKey,
  getLyric,
};
