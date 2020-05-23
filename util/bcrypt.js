const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('core_variables');

module.exports.hash = async function(password) {
  return bcrypt.hash(password, +SALT_ROUNDS)
}

module.exports.compare = async function(password, hash) {
  return bcrypt.compare(password, hash)
}