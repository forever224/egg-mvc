/* eslint-disable no-bitwise */
'use strict';
const crypto = require('crypto');
const algorithm = 'aes-128-cbc';
const salt = 'hsb';
const iv = Buffer.alloc(16, 0);
const password = 'oabuohsiuh';
const key = crypto.scryptSync(password, salt, 16);
const isType = o => {
  return str => {
    return Object.prototype.toString.call(str) === '[object ' + o + ']';
  };
};
module.exports = {
  isArray: isType('Array'),
  isObject: isType('Object'),
  isFunction: isType('Function'),
  isString: isType('String'),
  isBoolean: isType('Boolean'),
  isRegExp: isType('RegExp'),
  isNumber: isType('Number'),
  isUint8Array: isType('Uint8Array'),
  isDate: isType('Date'),
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
  // 获取ip
  ip(req) {
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
  },
  // 判断是否为空 仅限于{ Array, Object, String }类型
  isEmpty(params) {
    params = params || {};
    return Object.keys(params).length;
  },

  // 随机数 28EA8-EDA1-12110-AE63-89DD93BEF
  mathId(num) {
    num = num || '0';
    const str = 'xxxxx-xxxx-' + num + 'xxx-yxxx-xxxxxxxxx';
    return str
      .replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
      .toUpperCase();
  },
  // 生成md5
  md5(options) {
    options = options || '';
    let result = '';
    if (!options) return result;
    if (!this.isString(options)) {
      options = JSON.stringify(options);
    }
    const md5 = crypto.createHash('md5');
    result = md5.update(options).digest('hex');
    return result;
  },
  /**
   * @method day
   * @description 时间格式化
   *
   * @method generate 生成基准时间对象
   * @method timeStamp 返回时间戳, 1486779531201
   * @method date 返回年月日, 2017-02-11
   * @method hours 返回时分秒, 10:18:51
   * @method seconds 返回毫秒, 204
   * @method timeSeconds 返回年月日-时分秒-毫秒, 2017-02-11 10:18:51:205
   * @method time 返回年月日-时分秒, 2017-02-11 10:18:51
   *
   */
  day: {
    generate(timeStamp) {
      const time = timeStamp || new Date();
      const getMilliseconds = time.getMilliseconds();
      const timeFormat = num => {
        if (num < 10) return '0' + num;
        return num;
      };
      const day = time.getFullYear() + '-' + timeFormat(time.getMonth() + 1) + '-' + timeFormat(time.getDate());
      const hours = time.toTimeString().slice(0, 8);

      return {
        timeStamp: +time, // 1616125152317
        day, // 2021-03-01
        hours, // 11:41:50
        seconds: getMilliseconds, // 0-999
      };
    },
    timeStamp(timeStamp) {
      return this.generate(timeStamp).timeStamp;
    },
    date(timeStamp) {
      return this.generate(timeStamp).day;
    },
    hours(timeStamp) {
      return this.generate(timeStamp).hours;
    },
    seconds(timeStamp) {
      return this.generate(timeStamp).seconds;
    },
    timeSeconds(timeStamp) {
      const o = this.generate(timeStamp);
      return o.day + ' ' + o.hours + ':' + o.seconds;
    },
    time(timeStamp) {
      const o = this.generate(timeStamp);
      return o.day + ' ' + o.hours;
    },
  },
};
