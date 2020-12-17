const authUtil = require('util/auth');
const errorConst = require('const/errors');

const whiteList = [
  '/',
  '/login',
  '/register'
];

module.exports = async (ctx, next) => {
  if(!whiteList.find(url => url === ctx.request.url)) {
    const token = ctx.request.headers['authorization'];

    try {
      const decoded = await authUtil.verifyAndGetDecoded(token);
      if(!decoded) {
        ctx.throw(401, errorConst.INVALID_TOKEN);
      }

      ctx.request.decodedUser = decoded;
    } catch(err) {
      ctx.throw(401, errorConst.INVALID_TOKEN);
    }
  }
  // ctx.status = 200;
  await next();
};