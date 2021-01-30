/**
 * 职责： 防止重复的网络请求
 */
import { getUrl } from '../utils';
import * as interFace from '../utils/interface';

export default class httpRequet {
  list: any; // 请求队列
  http: any;// 请求体
  config: interFace.Config; // 请求参数
  options: interFace.logOptions; // log配置参数项
  response: interFace.Response;

  constructor() {
    this.list = new Set();
    this.http = Object.create(null);  // 例如axios
    this.config = Object.create(null);
    this.options = Object.create(null);
    this.response = {
      config: this.config
    }
  }

  /**
   * 设置请求
   * @param {Object} config  配置项
   */
  setRequest(http: any, options?: interFace.logOptions) {
    this.http = http;
    this.options = options || {};
  }

  /**
   * 获取请求
   * @param {Object} config  配置项
   */
  getRequest(config: interFace.Config) {
    this.config = config;
    const _that = this;
    return new Promise((resolve, reject) => {
      const currentUlr = getUrl(config); // 获取url地址
      if (_that.list.has(currentUlr)) {
        // 在请求队列里， 取消本次请求
        reject('Duplicate request');
      }
      // 1.没有请求， 添加到队列里
      _that.list.add(currentUlr);
      // 2.返回成功 发送请求
      resolve(_that.http(config));
    })
  }

  /**
   * 响应回来后删除url地址
   * @param {Object} response 响应参数
   */
  handleResponse(response: interFace.Response) {
    this.response = response;
    const { config } = response;
    const currentUlr = getUrl(config);
    this.list.has(currentUlr) && this.list.delete(currentUlr);
  }

  /**
   * 清空所有请求队列
   */
  clearList(error?) {
    this.list.clear();
  };
}
