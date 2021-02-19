/**
 * 职责： 防止重复的网络请求
 */
import { getApiUrl } from '../../utils';
import * as interFace from '../../utils/interface';
import LogHttp from '../httpConfig/logHttp';

export default class httpRequet {
  list: any; // 请求队列
  http: any;// 请求体
  logInfo: any; //打印控制台
  options: interFace.logOptions; // log配置参数项

  constructor(http: any, options?: interFace.logOptions) {
    this.list = new Set();
    this.http = http;
    this.options = options || Object.create(null);

    this.logInfo = new LogHttp(options);
  }

  /**
   * 获取请求
   * @param {Object} config  配置项
   */
  getRequest(config: interFace.Config): any {
    this.logInfo.requestLogInfo(config); // 控制台打印

    return new Promise((resolve, reject) => {
      const { cancelRepeat = false } = config;

      if (cancelRepeat) {
        resolve(this.http(config));
        return
      }

      const currentUlr = getApiUrl(config); // 获取url地址
      if (this.list.has(currentUlr)) {
        // 在请求队列里， 取消本次请求
        reject('Duplicate request');
        return;
      }
      // 1.没有请求， 添加到队列里
      this.list.add(currentUlr);
      // 2.返回成功 发送请求
      resolve(this.http(config));
    })
  }

  /**
   * 响应回来后删除url地址
   * @param {Object} response 响应参数
   */
  handleResponse(response: interFace.Response): interFace.Response {
    this.logInfo.responseLogInfo(response); // 控制台打印
    const { config } = response;
    const currentUlr = getApiUrl(config);
    this.list.has(currentUlr) && this.list.delete(currentUlr);
    return response
  }

  /**
   * 清空所有请求队列
   */
  clearList(error?: any): void {
    this.list.clear();
  };
}
