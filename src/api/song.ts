import { commonParams, options } from './config';
import axios from 'axios';

export const getSongVKey = (guid: number, songMid: string): Promise<any> => {
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

export default {
  getSongVKey,
};
