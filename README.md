# gio

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ 创建数据库
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

### sequelize-cli 相关命令 - npx sequelize --help - https://github.com/sequelize/cli

#### 创建/database/config.json 生成数据库配置文件

- npx sequelize init:config

#### 创建/database/migrations 数据库创建/升级/降级配置文件

- npx sequelize init:migrations

#### 创建表初始化配置

- npx sequelize migration:generate --name=init-users

#### 升级数据库

- NODE_ENV=production npx sequelize db:migrate

#### 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更

- npx sequelize db:migrate:undo

#### 可以通过 `db:migrate:undo:all` 回退到初始状态

- npx sequelize db:migrate:undo:all
