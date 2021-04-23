const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }
  success(data) {
    this.ctx.body = {
      code: 200,
      isSuccess: true,
      data,
      message: '成功',
    };
  }
}
module.exports = BaseController;
