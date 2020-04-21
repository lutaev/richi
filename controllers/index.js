const fs = require('fs');
const path = require('path');

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

module.exports.getMainPage = async (ctx, next) => {
  await next();
  ctx.body = await readFileThunk(path.resolve(process.cwd(), 'index.html'));
}