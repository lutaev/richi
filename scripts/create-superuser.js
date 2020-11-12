// This script creates root user. Password and name should be changed immediately after first launch

const Model = require('sequelize/models');
const { hash } = require('util/bcrypt');

module.exports = async function createSuperUser() {
  const { users } = Model;
  const allUsers = await users.findAll();

  if(allUsers.length) {
    return null
  }

  const user = {
    role: '0',
    name: 'Superadmin',
    email: 'root@emailrandom.com',
    phoneNumber: ['+11111111111'],
    password: await hash('password'),
    confirmed: true
  };
  return users.build(user).save()
};