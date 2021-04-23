'use strict';

const Service = require('egg').Service;

class BaseServiceService extends Service {
  constructor(ctx, modelKey) {
    super(ctx);
    if (modelKey) {
      this.model = ctx.model[modelKey];
    }
  }

  /**
   * 创建一条记录
   * @param {Object} values 数据
   * @param {Object} options 配置项
   * @url https://sequelize.org/master/class/lib/model.js~Model.html#static-method-create
   * @return {Promise<Model>} 返回值为创建成功的数据模型对象
   */
  create(values, options) {
    return this.model.create(values, options);
  }
  /**
   * 获取指定条件的记录数量
   * @param {Object} options 配置项
   * @url https://sequelize.org/master/class/lib/model.js~Model.html#static-method-count
   * @returns { Promise<number> }
   */
  count(options) {
    return this.model.count(options);
  }
  /**
   * 获取符合条件的第一条数据
   * @param {Object} options 配置项
   * @url https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findOne
   * @returns {Promise<Model|null>}
   */
  findOne(options) {
    return this.model.findOne(options);
  }
  /**
   * 获取列表数据集
   * @param {Object} options 配置项
   * @url api文档： https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll
   * @url 中文说明文档： https://www.sequelize.com.cn/core-concepts/model-querying-basics#select-%E6%9F%A5%E8%AF%A2%E7%89%B9%E5%AE%9A%E5%B1%9E%E6%80%A7
   * @returns {Promise<Array<Model>}
   */
  findList(options) {
    return this.model.findAll(options);
  }
  /**
   * 更新一条或多条记录
   * @param {*} values 需要更新的数据
   * @param {*} options 查询条件
   * @url https://sequelize.org/master/class/lib/model.js~Model.html#static-method-update
   * @returns {Promise<Array<number, number>}
   */
  update(values, options) {
    return this.model.update(values, options);
  }
  /**
   * 获取列表数据集
   * @param {Object} options 配置项
   * @url api文档： https://sequelize.org/master/class/lib/model.js~Model.html#static-method-destroy
   * @returns {Promise<Array<Model>}
   */
  destroy(options) {
    return this.model.destroy(options);
  }
}

module.exports = BaseServiceService;
