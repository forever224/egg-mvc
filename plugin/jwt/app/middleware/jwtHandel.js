'use strict';
module.exports = () => {
  return async (ctx, next) => {
    const token = ctx.header.authorization;
    const match = ctx.app.config.jwt.whiteList.some(value => value.test(ctx.url));
    if (match) return await next();
    if (!token) {
      ctx.body = {
        code: 312,
        isSuccess: false,
        data: null,
        message: '您还未登录，请登录！',
      };
      return;
    }
    const signInfo = await ctx.jwtVerify(token);
    if (signInfo.status !== 'success') {
      ctx.body = {
        code: 312,
        isSuccess: false,
        data: null,
        message: '验证不通过，请重新登录！',
      };
      return;
    }
    await next();
  };
};
