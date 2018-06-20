import jsonp from '@/assets/js/jsonp';
import { commonParams, options } from './config';
import axios from 'axios';

const getRecommend = (): Promise<any> => {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
  });
  return jsonp(url, data, options);
};

const getDiscByTag = (): Promise<any> => {
  const url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  const data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
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
  getRecommend,
  getDiscByTag,
};
