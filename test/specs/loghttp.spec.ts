import logHttp from '../../src/libs/httpConfig/logHttp';

describe('Request log function', function () {
  it('log value is true', function () {
    let res1 = new logHttp({ log: true });
    expect(res1.log).toBeTruthy(); // 为真;

    let res2 = new logHttp({ log: false });
    expect(res2.log).toBeFalsy(); // 为假;

    let res3 = new logHttp();
    expect(res3.log).toBeTruthy(); // 默认为真;

    let res4 = new logHttp({ env: 'development' });
    expect(res4.log).toBeTruthy(); // 开发模式为真;

    let res5 = new logHttp({ env: 'development', log: false });
    expect(res5.log).toBeFalsy(); // 提供log为准;

    let res6 = new logHttp({ env: 'production', log: true });
    expect(res6.log).toBeFalsy(); // 生成模式为假;

  })
})
