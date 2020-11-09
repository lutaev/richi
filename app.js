require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const auth = require('middleware/auth');
const router = require('router');

const app = new Koa();

app.use(cors());
app.use(bodyParser());

app.use(auth);
app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;