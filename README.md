# http-optimize

> 防止重复网络请求，**本地缓存**
>

## Development

```bash
$ git clone https://github.com/hzs0623/http-optimize
$ cd http-optimize
$ yarn
$ yarn build
```



### 📖一、新增功能

1. ##### 本地缓存数据✨

2. ##### 控制台打印数据信息✨

   

### 📖二、使用文档

| 事件         | 说明                   | 参数                                                     |
| ------------ | ---------------------- | -------------------------------------------------------- |
| getRequest   | 请求方法导出请求时执行 | 参数一：请求体(axios)， 参数二： options配置项 （图2.1） |
| HttpResponse | 响应拦截               | 参数一：响应回来的数据                                   |
| httpError    | 响应处理异常           | 参数一： 错误信息error                                   |

```javascript
import axios from 'axios';
import { getRequest, HttpResponse, httpError  } from 'http-optimize';   // 1. 导入

// 创建一个 axios 实例
const service = axios.create({
  baseURL:'http://www.xxx.com',
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    HttpResponse(response);  // 2. 响应拦截
  },
  error => {
    httpError(error);  // 3. 响应处理异常
  }
）
  
export default getRequest(service); // 4. 导出请求
  

```

#### 📖1.本地缓存数据配置

> 保存到本地的localStorage里， key值`CACHE_DATA`

| 参数  | 说明         | 类型             |
| ----- | ------------ | ---------------- |
| cache | 开启本地缓存 | Object ｜Boolean |

`demo`

```javascript
import http from './axios'; // 请求接口方法；

  queryInitData(params) {
    return http({
      url: '/api/xxx/xxx', // 请求地址
      method: 'get',  // 请求方式 缓存支持get 和 post
      cache: {  // + 添加本地缓存  cache接受 对象 {} 
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

#### 📖2.请求方法配置项

**getRequest方法第二参数配置**： 

 `options`参数配置： Object

| 事件          | 说明                                      | 类型     |
| ------------- | ----------------------------------------- | -------- |
| log           | 数据内容是否打印控制台                    | Boolean  |
| Env           | 环境变量， 只在开启开发模式打印控制台信息 | String   |
| responseCache | 本地缓存响应数据拦截器                    | Function |

图2.1



`demo`

```javascript
import axios from 'axios';
import { getRequest, HttpResponse, httpError  } from 'http-optimize';   // 1. 导入

// 创建一个 axios 实例
const service = axios.create({
  baseURL:'http://www.xxx.com',
});

// 参数一： 请求体axios
//参数二：	配置项options 如下❕
export getRequest(service， options) 

// ⚠️配置项
const options = {
  log: true, // 开启控制台打印
  env: 'dev', // 环境变量 线上环境不打印
  responseCache: data => {
    // data 本地缓存数据  可以做一些操作
    return data;
  },
};


```

