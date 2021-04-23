'use strict';
// 参数验证用了parameter，具体配置请查阅：https://www.npmjs.com/package/parameter
module.exports = {
  baseResponse: {
    code: { type: 'integer', require: true, description: '接口返回码' },
    isSuccess: { type: 'boolean', required: true, description: '接口状态' },
    message: { type: 'string', required: false, description: '返回信息' },
  },
};
