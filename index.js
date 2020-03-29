require('dotenv').config();

const Koa = require('koa');
// const Models = require('sequelize/models');
const logger = require('util/logger');

const router = require('router')

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
