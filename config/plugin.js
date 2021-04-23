'use strict';

const path = require('path');
/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  jwt: {
    enable: true,
    path: path.join(__dirname, '../plugin/jwt'),
  },
};
