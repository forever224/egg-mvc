'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const algorithm = 'aes-128-cbc';
const salt = 'hsb';
const iv = Buffer.alloc(16, 0);
const password = 'oabuohsiuh';
const key = crypto.scryptSync(password, salt, 16);
const cipher = {
  // 加密
  encrypt: data => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  },
  // 解密
  decrypt: encrypted => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  },
};
// 获取ip
function getIp(req) {
  try {
    const connection = req.connection || {};
    const socket = req.socket || {};
    const cs = connection.socket || {};
    let ip = req.headers['x-forwarded-for'] || connection.remoteAddress || socket.remoteAddress || cs.remoteAddress || '';

    // 本地ip
    if (ip.indexOf('::ffff') > -1) ip = ip.slice(7);
    if (ip.indexOf(',') > -1) {
      ip = ip.slice(0, ip.indexOf(','));
    }
    return ip;
  } catch (err) {
    console.log('获取ip失败');
    return false;
  }
}

module.exports = {
  jwtSign(user) {
    const config = this.app.config.jwt;
    const payload = { user };
    if (config.verify && config.verify.ip) {
      payload.ip = getIp(this.req);
    }
    if (config.verify && config.verify.ua) {
      payload.userAgent = this.req.headers['user-agent'];
    }
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        config.secret,
        {
          expiresIn: config.expiresTime,
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(cipher.encrypt(token)); // 加密返回
        }
      );
    });
  },
  jwtVerify(token) {
    try {
      token = cipher.decrypt(token); // 解密验证
    } catch (error) {
      return Promise.resolve({ status: 'error' });
    }
    const config = this.app.config.jwt;
    return new Promise((resolve, reject) => {
      // 验证token, 传输私钥
      jwt.verify(token, config.secret, (err, decode) => {
        if (err) {
          resolve({ status: 'invalid' }); // 验证失败
        }
        if (config.verify && config.verify.ip) {
          const ip = getIp(this.req);
          if (ip !== decode.ip) {
            resolve({ status: 'error' }); // 无效token
          }
        }
        if (config.verify && config.verify.ua) {
          const userAgent = this.req.headers['user-agent'];
          if (userAgent !== decode.userAgent) {
            resolve({ status: 'error' });
          }
        }
        resolve({ ...decode, status: 'success' }); // 验证通过
      });
    });
  },
};
