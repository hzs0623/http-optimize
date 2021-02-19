// 临时存入

export default {
  setItem(key: string, value: string) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        // 清空localStorage
        window.localStorage.removeItem(key);
      }
    }
  },
  getItem(key: string) {
    try {
      const data: string = window.sessionStorage.getItem(key);
      return JSON.parse(data);
    } catch (e) {
      throw new TypeError(`fail to get is ${key} sessionStorage, info ${e}`);
    }
  }
}