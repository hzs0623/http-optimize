import http from './antiDuplication/index';
import cacheHttp from './cacheRequest/index';
import * as interFace from './utils/interface';

let getHttp: any;
let cacheRequst: any;

/**
 * @param {Function} request 请求体
 * @param {Object} options 打印控制台信息
 */
export const getRequest = (request: any, options?: interFace.logOptions) => {
  options = options ? options : {};
  getHttp = new http(request, options);  // 1.创建一个防止重复网络实例
  cacheRequst = new cacheHttp(options); // 本地缓存

  return function (config: interFace.Config) {
    const cacheData = cacheRequst.getCacheData(config);
    if (cacheData) {
      return Promise.resolve(cacheData); // 返回本地缓存数据
    }
    // 2.返回http方法
    return getHttp.getRequest(config);
  };
}

// 响应请求
export const HttpResponse = (response: interFace.Response) => {
  cacheRequst.setCacheData(response);
  return getHttp.handleResponse(response);
};

// error处理
export const httpError = (error?: any) => {
  getHttp.clearList(error)
};

