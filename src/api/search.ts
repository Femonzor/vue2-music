import jsonp from '@/assets/js/jsonp';
import { commonParams, options } from './config';

const getHotKey = (): Promise<any> => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
  });
  return jsonp(url, data, options);
};

export default {
  getHotKey,
};
