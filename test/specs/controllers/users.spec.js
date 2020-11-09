const supertest = require('supertest');
const { expect } = require('chai');
const Models = require('sequelize/models');
const jwt = require('jsonwebtoken');
const { hash } = require('util/bcrypt');
const server = require('server');
const { toJSON } = require('util/test');

describe('Users controllers', () => {
  const User = Models.users;

  const phoneNumber = '+11111111111';
  const password = 'test';
  let testUser;

  before(async () => {
    testUser = {
      role: '1',
      name: 'Admin',
      email: 'admin@emailrandom.com',
      phoneNumber: [phoneNumber],
      password: await hash(password),
      confirmed: true
    }
  })

  afterEach(async () => {
    await User.destroy({
      truncate: true
    })
  });

  describe('List', () => {
    it('should return users list', async () => {
      await User.build(testUser).save();

      const allUsers = toJSON(await User.findAll());
      const user = allUsers[0];
      const token = jwt.sign({
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role
      }, process.env.JWT_SECRET);

      const result = await supertest(server)
        .get('/user/list')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(allUsers).to.deep.equal(result.body);
    });

    it('should return user profile', async () => {
      await User.build(testUser).save();

      const allUsers = toJSON(await User.findAll());
      const user = allUsers[0];
      const token = jwt.sign({
        uuid: user.uuid,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role
      }, process.env.JWT_SECRET);

      const result = await supertest(server)
        .get('/user/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(result.body.uuid).to.equal(user.uuid);
    });
  });
});
