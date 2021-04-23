'use strict';
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err, ctx);
      const prodTip = ctx.app.config.env === 'prod' ? 'Internal Server Error' : '';
      // 请求参数错误
      if (err.statusCode === 422) {
        ctx.status = 422;
        ctx.body = {
          code: 422,
          isSuccess: false,
          data: prodTip || err.errors,
          message: prodTip || err.message,
        };
        return;
      }
      // 字段唯一限制
      if (err.name === 'SequelizeUniqueConstraintError') {
        ctx.status = 421;
        ctx.body = {
          code: 421,
          isSuccess: false,
          data: `${Object.keys(err.fields)}字段不能重复`,
          message: err.errors,
        };
        return;
      }
      // status = 312 为jwt验证失败，自定义插件错误无法在此捕获
      // if (err.status === 312) {
      //   ctx.status = 312;
      //   ctx.body = {
      //     code: 312,
      //     isSuccess: false,
      //     data: err.status,
      //     message: err.message || err,
      //   };
      //   return;
      // }
      // throw 抛出的错误
      if (typeof err === 'string' || err.statusCode === 501) {
        ctx.status = 501;
        ctx.body = {
          code: 501,
          isSuccess: false,
          data: null,
          message: err.message || err,
        };
        return;
      }
      // 500语法错误
      ctx.status = 500;
      ctx.body = {
        code: 500,
        isSuccess: false,
        data: prodTip || err.stack,
        message: prodTip || err.message,
      };
    }
  };
};
