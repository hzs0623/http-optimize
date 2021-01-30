/**
 * 职责：处理请求方法
*/
import * as interFace from '../utils/interface';

let islogInfo = false; // 是否打印控制台
let ENV = 'development'; // 环境变量

/**
 * 打印请求控制台 
 * @param {object} config 参数配置项
 * @param {boolean} logInfo 是否控制台打印
*/
export function requestLogInfo(config: interFace.Config, options?: interFace.logOptions) {
  const { env = 'development', log = true } = options || {};
  ENV = env; // 环境变量
  if (env === 'production') return; // 生产环境不打印

  if (!log) return;
  islogInfo = true; // 开启打印


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
export function responseLogInfo(response: interFace.Response) {
  if (!islogInfo) return;
  if (ENV === 'production') return; // 线上环境
  const { config, data: httpData } = response;
  const { method = 'get', url = "", baseURL = '' } = config;
  console.log(
    `%c ${method} %c ${url.replace(baseURL, '')} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#d76156 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent', httpData || {}
  );
}
