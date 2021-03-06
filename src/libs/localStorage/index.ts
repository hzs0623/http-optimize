/**
 * 职责： localStorage 
*/
import sessionStorage from './sessionStorage';

// 存入localStorage
export function setItemLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // （谷歌, 360, 火狐, ie）本地存储满了抛出的错误
    if (e.name === 'QuotaExceededError') {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  }
}

// 获取localStorage
export function getItemLocalStorage(key: string): object {
  try {
    const res: string = localStorage.getItem(key) || sessionStorage.getItem(key);
    return JSON.parse(res) || {};
  } catch (e) {
    throw new TypeError(`fail to get is ${key} localStorage, info ${e}`)
  }
}

// 删除localStorage
export function removeItemStorage(key: string): void {
  localStorage.removeItem(key);
}

// 清空所有localStorage
export function clearLocalStorage(): void {
  localStorage.clear();
}
