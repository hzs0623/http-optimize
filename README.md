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



## 前言

> 在开发中，经常会遇到接口重复请求导致的各种问题。

> 对于重复的**get**请求，会导致页面更新多次，发生页面抖动的现象，影响用户体验。

> 对于重复的**post**请求，会导致在服务端生成两次记录（例如生成两条订单记录）。

> 如果当前页面请求还未响应完成，就切换到了下一个路由，那么这些请求直到响应返回才会中止。

> 无论从用户体验或者从业务严谨方面来说，取消无用的请求确实是需要避免的。


### 开发文档

```javascript
import axios from 'axios';
import { getRequest, clearList, deletAxiosList  } from 'http-optimize';   // 1. 导入

// 创建一个 axios 实例
const service = axios.create({
  baseURL:'http://www.xxx.com',
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    deletAxiosList(response);  // 2. 将response参数执行
  },
  error => {
    clearList();  // 3. 清空队列
  }
）
  
export default getRequest(service); // 4. 导出请求
  

```

#### 1.支持缓存数据到本地；保存到本地的**localStorage**里面。

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

#### 2.是否开启控制台打印

**getRequest() 方法**： 

```javascript
// 参数一： 请求体axios
//参数二：	配置项options
getRequest(axios， options) 

​	const options = {
  		    log: true, // 开启控制台打印   
  			  env: 'dev',  // 环境变量 线上环境不打印
			 }
```

