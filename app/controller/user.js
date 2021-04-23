'use strict';
// egg-swagger-doc 具体查阅：https://www.npmjs.com/package/egg-swagger-doc
const Controller = require('../code/base.controller');

/**
 * @controller user 用户接口
 */
class UserController extends Controller {
  /**
   * @summary 用户登录
   * @description 用户登录
   * @router post /v1/user/login
   * @request body loginRequest *body
   * @response 200 baseResponse 登录成功
   */
  async login() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.loginRequest);
    const loginInfo = ctx.request.body;
    const data = await service.user.login(loginInfo);
    this.success(data);
  }
  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /v1/user/create
   * @request body userRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.userRequest);
    const user = ctx.request.body;
    const data = await service.user.create(user);
    this.success(data);
  }
  /**
   * @summary 获取所有用户数量
   * @description 获取所有用户数量
   * @router get /v1/user/count
   * @response 200 baseResponse 创建成功
   */
  async count() {
    const { service } = this;
    const data = await service.user.count();
    this.success(data);
  }
  /**
   * @summary 更新用户数据
   * @description 更新用户数据
   * @router post /v1/user/update/{id}
   * @request path string *id
   * @request body userRequest *body
   * @response 200 baseResponse 创建成功
   */
  async update() {
    const { ctx, service } = this;
    const userId = ctx.params.userId;
    const user = ctx.request.body;
    const data = await service.user.update(user, { where: { userId } });
    this.success(data);
  }
  /**
   * @summary 获取所有用户列表
   * @description 获取所有用户列表
   * @request query integer currentPage 页码 默认 1
   * @request query integer pageSize 单页数量 默认 20
   * @router get /v1/user/list
   * @response 200 baseResponse 创建成功
   */
  async list() {
    const { ctx, service } = this;
    const { currentPage = 1, pageSize = 20 } = ctx.query;
    ctx.validate(ctx.rule.pageQuery, { currentPage: +currentPage, pageSize: +pageSize });
    const data = await service.user.findList({ offset: +pageSize * (+currentPage - 1), limit: +pageSize });
    this.success(data);
  }
}
module.exports = UserController;
