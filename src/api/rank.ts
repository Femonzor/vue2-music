import jsonp from '@/assets/js/jsonp';
import { commonParams, options } from './config';

const getTopList = (): Promise<any> => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
  });
  return jsonp(url, data, options);
};

const getMusicList = (topId: string): Promise<any> => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  const data = Object.assign({}, commonParams, {
    page: 'detail',
    type: 'top',
    tpl: 3,
    platform: 'h5',
    needNewCode: 1,
    topid: topId,
  });
  return jsonp(url, data, options);
};

export default {
  getTopList,
  getMusicList,
};
