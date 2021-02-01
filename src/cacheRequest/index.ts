/**
 * 职责： 缓存请求数据
*/
import * as interFace from '../utils/interface';
import { getUrl, isObj, CACHEKEY } from '../utils';
import { setItemLocalStorage, getItemLocalStorage } from '../utils/localStorage';

export default class CacheRequet {
  options: interFace.logOptions; // log配置参数项

  constructor(options?: interFace.logOptions) {
    this.options = options || {}
  }

  getTime(time: interFace.Time): number {
    const { h = 0, m = 0 } = time;
    const _t = h * 3600 * 1000 + m * 60 * 1000; // 所有时间戳
    return _t + Date.now();
  }

  // 获取过期时间
  getExpirationTime(config: interFace.Config): number {
    const { cache } = config;
    if (isObj(cache)) {
      return this.getTime(cache || {});
    }
    if (typeof cache === 'boolean') {
      // 默认开启五分钟
      return this.getTime({ m: 5 });
    }
    return Date.now(); // 存入当前时间
  }

  setStorageData(data: object, config: interFace.Config): void {
    const urlKey = getUrl(config); // 获取url地址作为每一个key
    // 1.先取出所有的数据 然后在把当前的值塞入进去
    const mapData: object = getItemLocalStorage(CACHEKEY); // 本地所有数据
    if (!mapData) {
      const params = Object.create(null);
      params[urlKey] = data;
      setItemLocalStorage(CACHEKEY, params); // 存入本地
      return;
    }

    mapData[urlKey] = data; // 赋值给当前对象
    setItemLocalStorage(CACHEKEY, mapData); // 存入本地
  }

  // 保存数据到本地
  setCacheData(response: interFace.Response): void {
    const { data = {}, config } = response;
    const { cache } = config;
    if (!cache) return; // 不要开启缓存 直接返回

    this.setStorageData({
      data,
      expirationTime: this.getExpirationTime(config) // 过期时间
    }, config)
  }

  // 获取本地缓存数据
  getCacheData(config: interFace.Config): any {
    const { responseCache } = this.options;

    const { cache } = config;
    if (!cache) return; // 不要开启缓存 直接返回
    const localData: object = getItemLocalStorage(CACHEKEY); //1. 获取本地所有数据
    if (!localData) return false; //2. 没有数据直接返回
    const urlKey = getUrl(config); // 获取url地址作为每一个key
    // 3.判断当前数据是否过期
    const { data = {}, expirationTime = 0 } = localData[urlKey] || {};

    if (expirationTime <= Date.now()) {
      // 时间过期
      return false;
    }

    if (typeof responseCache === 'function') {
      return responseCache(data); // 拦截响应配置一些参数
    }
    // 4.时间没有过期，返回本地数据
    return data
  }
}
