import originJSONP from 'jsonp';

const param = (data: any): string => {
  let url: string = '';
  const keys: Array<string> = Object.keys(data);
  keys.forEach(key => {
    let value = data[key] !== undefined ? data[key] : '';
    url += `&${key}=${encodeURIComponent(value)}`;
  });
  return url ? url.substring(1) : '';
};

export default (url: string, data: any, options: Object): Promise<any> => {
  url += (/\?/.test(url) ? '&' : '?') + param(data);
  return new Promise((resolve, reject) => {
    originJSONP(url, options, (error, data) => {
      if (!error) {
        resolve(data);
      } else {
        reject(error);
      }
    });
  });
};
