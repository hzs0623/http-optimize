import httpRequet from '../../../src/libs/antiDuplication';

function axios(config: any): any {
  return new Promise(resove => {
    resove({
      "name": "yifang"
    })
  })
}

describe('antiDuplication', function () {

  let http = new httpRequet(axios, { log: false });

  it('getReuqest is data', async function () {
    const config = {
      url: '127.0.0.1',
      method: 'get',
      params: {
        name: 'yifang',
        age: 18
      }
    }
    let res = await http.getRequest(config);
    expect(res).toEqual({
      name: "yifang"
    });

    const data = [...http.list][0];
    expect(data).toBe('127.0.0.1?name=yifang&age=18');

  });

  it(`list is Url`, function () {
    const config = {
      url: '127.0.0.1',
      method: 'get',
      params: {
        name: 'yifang',
        age: 18
      }
    }
    http.getRequest(config);

    const responseData = http.handleResponse({
      config
    });

    expect(responseData).toEqual({ config });

    const list = [...http.list];
    expect(list.length === 0).toBeTruthy();
  })
})