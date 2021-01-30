// 参数项
export interface Config {
  method?: string,
  url?: string,
  data?: object,
  params?: object,
  baseURL?: string
  cache?: Object
}

// 响应
export interface Response {
  config: Config,
  data?: Object
}

export interface logOptions {
  log?: boolean,
  env?: string,
}

