'use strict';

module.exports = {
  userRequest: {
    username: { type: 'string', required: true, description: '用户姓名' },
    sexy: { type: 'string', required: true, enum: ['male', 'female'], description: '用户性别' },
    email: {
      type: 'string',
      required: false,
      example: '277699296@qq.com',
      format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      description: '邮箱',
    },
    phone: { type: 'string', required: true, example: '17722816257', format: /^1[34578]\d{9}$/, description: '电话' },
    password: { type: 'string', required: true, description: '密码' },
    wxOpenid: { type: 'string', required: true, description: '微信openid' },
    alOpenid: { type: 'string', required: true, description: '阿里openid' },
  },
  loginRequest: {
    phone: { type: 'string', require: true, description: '手机' },
    password: { type: 'string', require: true, description: '密码' },
  },
};
