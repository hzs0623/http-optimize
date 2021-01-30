import http from './antiDuplication/index';
import cacheHttp from './cacheRequest/index';

const getHttp = new http();
const cacheRequst = new cacheHttp();

/**
 * @param {Function} http 请求体
 * @param {Object} options 打印控制台信息
 */
export const getRequest = (http: any, options?) => {
  // 1.创建一个防止重复网络实例
  getHttp.setRequest(http, options);
  return function (config) {
    const cacheData = cacheRequst.getCacheData(config);
    if (cacheData) {
      return Promise.resolve(cacheData); // 返回本地缓存数据
    }
    // 2.返回http方法
    return getHttp.getRequest(config);
  };
}

// 响应请求
export const HttpResponse = (response) => {
  cacheRequst.setCacheData(response);
  return getHttp.handleResponse(response);
};

// error处理
export const httpError = (error?) => {
  getHttp.clearList(error)
};

