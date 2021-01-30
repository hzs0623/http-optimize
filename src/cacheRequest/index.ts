/**
 * 职责： 缓存请求数据
*/
import * as interFace from '../utils/interface';

import { getUrl, isObj, CACHEKEY } from '../utils';
import { setItemLocalStorage, getItemLocalStorage } from '../utils/localStorage';

export default class CacheRequet {
  config: interFace.Config; // 请求参数
  response: interFace.Response;

  constructor() {
    this.response = Object.create(null);
    this.config = Object.create(null);
  }

  getTime(time) {
    const { h = 0, m = 0 } = time;
    const _t = h * 3600 * 1000 + m * 60 * 1000; // 所有时间戳
    return _t + Date.now();
  }

  // 获取过期时间
  getExpirationTime() {
    const { cache } = this.config;
    if (isObj(cache)) {
      return this.getTime(cache);
    }
    if (typeof cache === 'boolean') {
      // 默认开启五分钟
      return this.getTime({ m: 5 });
    }
    return Date.now(); // 存入当前时间
  }

  setStorageData(data) {
    const urlKey = getUrl(this.config); // 获取url地址作为每一个key
    // 1.先取出所有的数据 然后在把当前的值塞入进去
    const mapData = getItemLocalStorage(CACHEKEY); // 本地所有数据
    if (!mapData) {
      const params = {};
      params[urlKey] = data;
      setItemLocalStorage(CACHEKEY, params); // 存入本地
      return;
    }

    mapData[urlKey] = data; // 赋值给当前对象
    setItemLocalStorage(CACHEKEY, mapData); // 存入本地
  }

  // 保存数据到本地
  setCacheData(response) {
    const { data, config } = response;
    const { cache } = config;
    if (!cache) return; // 不要开启缓存 直接返回
    this.config = config;
    this.response = response;

    this.setStorageData({
      data,
      expirationTime: this.getExpirationTime() // 过期时间
    })
  }

  // 获取本地缓存数据
  getCacheData(config) {
    return ''
  }
}
