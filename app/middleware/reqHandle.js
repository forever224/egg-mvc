'use strict';
module.exports = () => {
  return async (ctx, next) => {
    // const sourceApi = ctx.url;
    // const match = options.allowApi.some(value => value.test(sourceApi));
    // if (!match) return await next();
    // const body = ctx.method === 'POST' ? ctx.request.body : ctx.query;
    // Object.assign(ctx, {
    //   userId: body.token,
    //   ip: ctx.headers['x-real-ip'] || ctx.headers['x-forwarded-for'],
    //   tracer: {
    //     traceId: ctx.headers['x-request-id'] || `reqid_${(Math.random() + '').slice(2)}_${Date.now()}`,
    //   },
    // });
    await next();
  };
};
