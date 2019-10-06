require('dotenv').config();

const fs = require('fs');
const Koa = require('koa');
const Models = require('sequelize/models');
const logger = require('util/logger');

const app = new Koa();

const readFileThunk = async src => {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
      if(err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

app.use(async (ctx, next) => {
  await next();
  ctx.body = await readFileThunk(__dirname + '/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
