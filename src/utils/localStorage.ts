
/**
 * 职责： localStorage 
*/

// 存入localStorage
export function setItemLocalStorage(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // （谷歌, 360, 火狐, ie）本地存储满了抛出的错误
    if (e.name === 'QuotaExceededError') {
      // 本地存储满了，清空本地存储
      removeItemStorage(key);
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
}

// 获取localStorage
export function getItemLocalStorage(key: string) {
  const res = localStorage.getItem(key);
  try {
    return JSON.parse(res);
  } catch (e) {
    throw new TypeError(`fail to get is ${key} localStorage, info ${e}`)
  }
}

// 删除localStorage
export function removeItemStorage(key: string) {
  localStorage.removeItem(key);
}

// 清空所有localStorage
export function clearLocalStorage() {
  localStorage.clear();
}
