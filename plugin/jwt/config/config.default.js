'use strict';

exports.jwt = {
  secret: '123456',
  expiresTime: 1 * 60 * 60 * 24, // 24小时
  verify: {
    ip: true,
    ua: true,
  },
  enable: false,
};
