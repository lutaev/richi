const Op = require('sequelize').Op;
const User = require('sequelize/models').users;
const errorConst = require('const/errors');
const roles = require('enums/role');
const { hash, compare } = require('util/bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('core_variables');

module.exports.register = async (ctx, next) => {
  await next();
  const params = ctx.request.body

  if(!params.phoneNumber || !params.password) {
    return ctx.throw(400, errorConst.INVALID_USER);
  }

  const existingUser = await User.findOne({
    where: {
      phoneNumber: {
        [Op.contains]: [params.phoneNumber]
      }
    }
  });
  if(existingUser) {
    return ctx.throw(400, errorConst.INVALID_USER_NUMBER);
  }

  const user = {
    ...params,
    phoneNumber: [params.phoneNumber],
    role: params.role || roles.user,
    name: params.name || '',
    password: await hash(params.password),
    // TODO: Need to add sending sms for confirmation
    confirmed: true
  }

  await User.build(user).save();
  ctx.body = true
}

module.exports.login = async (ctx, next) => {
  await next();
  const { phoneNumber, password } = ctx.request.body

  const user = await User.findOne({
    where: {
      phoneNumber: {
        [Op.contains]: [phoneNumber]
      }
    }
  });

  if(!user) {
    return ctx.throw(404, errorConst.USER_NOT_FOUND);
  }

  const match = await compare(password, user.password);
  if(!match) {
    return ctx.throw(400, errorConst.INVALID_PASSWORD);
  }

  ctx.body = jwt.sign({
    uuid: user.uuid,
    name: user.name,
    phoneNumber: user.phoneNumber,
    role: user.role
  }, JWT_SECRET);
};