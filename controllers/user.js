const User = require('sequelize/models').users;

module.exports.getAllUsers = async (ctx, next) => {
  await next();
  ctx.body = await User.findAll().map(item => {
    const parsed = item.toJSON();
    delete parsed.password;
    return parsed;
  });
};

module.exports.getUserProfile = async (ctx, next) => {
  await next();
  const result = await User.findOne({
    where: {
      uuid: ctx.request.decodedUser.uuid
    }
  });

  delete result.password;
  ctx.body = result;
};