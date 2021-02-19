import * as interFace from './interface';

export const isObj = (obj: any): any => Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length > 0;

export const isArray = (arr: any): any => Object.prototype.toString.call(arr) === '[object Array]' && arr.length > 0;

// 转换url地址 ==> a=1&b=2
const getformatObjVal = (obj: any): string => {
  obj = typeof obj === 'string' ? JSON.parse(`${obj}`) : obj;
  let str: Array<string> = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && p !== '_t') {
      const item = obj[p] === null ? '' : obj[p]; // 处理null
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(item));
    }
  }
  return str.join('&');
}

// 存入地址
export const getApiUrl = (config: interFace.Config): string => {
  // 暂时就在get请求、post请求的时候进行操作
  const { method = 'get', params = {}, url = '', baseURL = '' } = config;
  const urlVal: string = url.replace(baseURL, '');
  return `${urlVal}?${method === 'get' ? getformatObjVal(params) : 'post'}`;
}
