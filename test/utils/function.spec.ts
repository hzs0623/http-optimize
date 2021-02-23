import { isObj, isArray, getApiUrl } from '../../src/utils/function';

describe('utils::function', function () {
  it('Is it an empty object', function () {
    expect(isObj({ a: 1 })).toBe(true);
    expect(isObj({})).toBe(false);
    expect(isObj(2)).toBe(false);
  });

  it(`Is it Array`, function () {
    expect(isArray(2)).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray([])).toBe(false); // 空数组
    expect(isArray([1, 3])).toBe(true);
  });

  it(`Request the address`, function () {
    const config1 = {
      baseURL: 'http://127.0.0.1',
      params: {
        _t: 12141414,
        name: 'yifang',
        age: 18
      },
      method: 'get',
      url: '/api/init'
    };
    expect(getApiUrl(config1)).toBe(`/api/init?name=yifang&age=18`);

    const config2 = {
      baseURL: 'http://127.0.0.1',
      params: {
        _t: 12141414,
        name: 'yifang',
        age: 18
      },
      method: 'post',
      url: '/api/init'
    };
    expect(getApiUrl(config2)).toBe(`/api/init?post`);
  })

});