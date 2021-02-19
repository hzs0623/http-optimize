import http from './antiDuplication/index';
import cacheHttp from './cacheRequest/index';
import * as interFace from '../utils/interface';

let getHttp: any, cacheRequst: any;

// 获取请求 
export function getRequest(request: any, options?: interFace.logOptions): any {
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

// 请求响应
export function HttpResponse(response: interFace.Response): interFace.Response {
  cacheRequst.setCacheData(response);
  return getHttp.handleResponse(response);
}

// 请求响应错误
export function httpError(error?: any): void {
  getHttp.clearList(error)
}
