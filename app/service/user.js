'use strict';
const BaseService = require('../code/base.service');
class UserService extends BaseService {
  constructor(ctx) {
    super(ctx, 'User'); // User数据模型实例
  }
  async login(loginInfo) {
    const { ctx } = this;
    let user = await this.findOne({ phone: loginInfo.phone });
    if (loginInfo.password !== ctx.helper.decrypt(user.password)) {
      throw {
        message: '用户名或者密码错误',
        statusCode: 501,
      };
    }
    user = user.toJSON();
    delete user.password;
    // 鉴权插件未开启
    if (!ctx.jwtSign) {
      return { user };
    }
    // 生成鉴权信息
    const token = await ctx.jwtSign(user);
    // redis留存，方便后续拓展
    this.service.redis.set('loginUser_' + user.phone, token);
    this.service.redis.pexpire('loginUser_' + user.phone, this.app.config.jwt.expiresTime);
    const info = await ctx.jwtVerify(token);
    return { token, user, info };
  }
  // 重写基类方法
  async create(userInfo) {
    const { ctx } = this;
    if (userInfo.password) {
      userInfo.password = ctx.helper.encrypt(userInfo.password);
    }
    return ctx.model.User.create(userInfo);
  }
  // 重写获取列表
  async findList(pageInfo) {
    const { ctx } = this;
    const list = await ctx.model.User.findAll({ ...pageInfo, attributes: { exclude: ['password'] } });
    const total = await this.count();
    const pageCount = Math.ceil(total / pageInfo.pageSize);
    return { list, total, pageCount };
  }
}

module.exports = UserService;
