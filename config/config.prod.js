'use strict';

module.exports = appInfo => {
  const config = (exports = {});
  // 日志配置
  config.logger = {
    level: 'INFO', // 文件日志级别 NONE，DEBUG，INFO，WARN 和 ERROR
    consoleLevel: 'INFO', // 终端日志级别 默认为:INFO 及以上（WARN 和 ERROR)
    appLogName: `${appInfo.name}-my.log`,
    coreLogName: 'egg-web.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
  };
  // mysql配置
  config.sequelize = {
    username: 'root',
    password: '123456',
    database: 'test_gio_prod',
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: (field, next) => {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    timezone: '+08:00',
  };

  // 单redis
  config.redis = {
    client: {
      port: 6379,
      host: 'localhost',
      password: '123456',
      db: 2,
    },
  };

  return config;
};
