const User = require('sequelize/models').users;
const authUtil = require('util/auth');
const errorConst = require('const/errors');

module.exports.getAllUsers = async (ctx, next) => {
  await next();
  ctx.body = await User.findAll().map(item => item.toJSON());
};

module.exports.getUserProfile = async (ctx, next) => {
  await next();
  ctx.body = await User.findOne({
    where: {
      uuid: ctx.request.decodedUser.uuid
    }
  });
};