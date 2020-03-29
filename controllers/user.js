const Models = require('sequelize/models');

module.exports.getAllUsers = async (ctx, next) => {
  await next();
  ctx.body = await Models.users.findAll().map(item => item.toJSON());
}