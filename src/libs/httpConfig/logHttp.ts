/**
 * 职责：打印控制台信息
*/
import * as interFace from '../../utils/interface';

export default class LogHttp {
  options?: interFace.logOptions
  log: boolean

  constructor(options?: interFace.logOptions) {
    this.options = options || Object.create(null);
    this.log = this.isLog(); // 是否开启
  }

  isLog() {
    const { env = 'development', log = true } = this.options
    if (env === 'production') return false; // 生产环境不打印
    return log && env !== 'production';
  }

  /**
   * 打印请求控制台 
   * @param {object} config 参数配置项
  */
  requestLogInfo(config: interFace.Config): void {
    if (!this.log) return;

    const { method = 'get', data = {}, params = {}, url = "", baseURL = '' } = config;
    //get和post请求 打印
    console.log(
      `%c ${method} %c ${url.replace(baseURL, '')} %c`,
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent', method === 'get' ? params : data
    );
  }

  /**
   * 打印请求控制台 
   * @param {object} config 参数配置项
  */
  responseLogInfo(response: interFace.Response): void {
    if (!this.log) return;

    const { config, data: httpData } = response;
    const { method = 'get', url = "", baseURL = '' } = config;
    console.log(
      `%c ${method} %c ${url.replace(baseURL, '')} %c`,
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#d76156 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent', httpData || {}
    );
  }
}
