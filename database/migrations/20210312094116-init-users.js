'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  // https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('users', {
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      sexy: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: '性别',
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: false,
        comment: '邮箱',
        unique: 'email',
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '电话',
        unique: 'phone',
      },
      password: {
        type: DataTypes.STRING(120),
        allowNull: true,
        comment: '密码',
      },
      wx_openid: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '微信openid',
      },
      al_openid: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '阿里openid',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
