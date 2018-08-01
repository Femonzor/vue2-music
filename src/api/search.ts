import jsonp from '@/assets/js/jsonp';
import { commonParams, options } from './config';
import axios from 'axios';

const getHotKey = (): Promise<any> => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
  });
  return jsonp(url, data, options);
};

const search = (query: string, page: number, zhida: boolean, perpage: number): Promise<any> => {
  const url = '/api/soso/fcgi-bin/search_for_qq_cp';
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    remoteplace: 'txt.mqq.all',
    needNewCode: 1,
    uin: 0,
    platform: 'h5',
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
  getHotKey,
  search,
};
