## http-optimize 🚀

防止重复网络请求，前端本地缓存数据🏆

![issues](https://img.shields.io/github/issues/hzs0623/http-optimize) ![license](https://img.shields.io/github/license/hzs0623/http-optimize) ![twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fhzs0623%2Fhttp-optimize)


## 前言

在开发中，经常会遇到接口重复请求导致的各种问题例如：

1. 对于重复的**get**请求，会导致页面更新多次，发生页面抖动的现象，影响用户体验。
2. 对于重复的**post**请求，会导致在服务端生成两次记录（例如生成两条订单记录）。
3. 如果当前页面请求还未响应完成，就切换到了下一个路由，那么这些请求直到响应返回才会中止。


## 安装

#### npm

```sh
#最新版本
$ npm install http-optimize
```

#### yarn

```sh
#最新版本
$ yarn add http-optimize 
```



## 全局API🥊

#### getRequest

返回一个请求实例。应用发送请求实例。

```js
import { getRequest } from 'http-optimize'
import axios from 'axios'; // 自行安装

const http = getRequest(axios);

```

##### 参数

该函数接受一个选项对象作为第二个参数：

```js
...
const http = getRequest(axios, {
  log: true, // 开启控制台打印
  env: 'dev', // 环境变量 线上环境不打印
  responseCache: data => {  // 本地缓存响应拦截器
   // data 本地缓存数据  可以做一些操作
    return data;  
  },
});

```

#### HttpResponse

返回响应数据，一个普通对象。

##### 参数

该函数接受一个选项对象作为第一个参数：

> 这里引入axios来进行演示

```js
import axios from 'axios'; 
import { HttpResponse } from 'http-optimize';  // 引入

// 响应拦截器
axios.interceptors.response.use(response => {
    return HttpResponse(response);  // 返回响应数据
  }
）

```

#### httpError

该函数接受响应请求错误数据。参数为错误数据

> 在响应请求错误时执行

```js
...
import { httpError } from 'http-optimize';  // 引入

// 响应拦截器
service.interceptors.response.use(
  _ => {
   ...
  },
  error => {
    httpError(error);  // 响应处理异常
  }
）
```

## Demo

```js
import axios from 'axios';
import { getRequest, HttpResponse, httpError  } from 'http-optimize';   // 1. 导入

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return HttpResponse(response);  // 2. 响应拦截
  },
  error => {
    httpError(error);  // 3. 响应处理异常
  }
）

export default getRequest(axios); // 4. 导出请求
```

## 选项

### 本地缓存数据配置 **cache**

> 数据保存到本地的localStorage里， key值`HTTP_CACHE_DATA`

##### 参数

**cache** 

- **类型**： `Object | Boolean`

- **详细**：

  传递值为true，默认开启缓存5分钟。

  ```js
  import http from './axios'; // 导入请求实例；
  
  export function queryInitData(params) {
      return http({
        url: '/api/xxx/xxx', 
        method: 'get',  
        cache: true // 默认开启5分钟
      })
    },
  ```

  选项对象时，可以传递选项：

  > **h:**    小时
  >
  > **m**     分钟

  ```js
  import http from './axios'; 
  
  export function queryInitData(params) {
      return http({
        url: '/api/xxx/xxx', 
        method: 'get',  
        cache: {
          m: 3   // 缓存三分钟
        }
      })
    },
   
     /**
     *  cache: {
     *   h: 2       =>  缓存两个小时
     *   m: 5       =>  缓存5分钟
     *  }
     **/
   
  ```

**cancelRepeat**

- **类型**：`Boolean`

- **详细**：

  当前请求可以重复发送。值为`true`在上一个请求还没有回来时，下一个请求也可以开启

  ```js
  import http from './axios'; 
  
  export function queryInitData(params) {
      return http({
        url: '/api/xxx/xxx', 
        method: 'get', 
        cancelRepeat: true // 当前请求可以发送重复网络请求
      })
    },
  ```

  

### 更新

1. localStorage存入不进去，存入到sessionStorage里。 
2. 每次写入数据前，清理过期时间的数据


