// 参数项
export interface Config {
  method?: string,
  url?: string,
  data?: object,
  params?: object,
  baseURL?: string
  cache?: Object,
  cancelRepeat?: Boolean
}

// 响应
export interface Response {
  config: Config,
  data?: Object
}

// 配置参数
export interface logOptions {
  log?: boolean,
  env?: string,
  responseCache?: any,  // 本地缓存响应拦截函数
}

// 缓存时间
export interface Time {
  h?: number,
  m?: number
}
