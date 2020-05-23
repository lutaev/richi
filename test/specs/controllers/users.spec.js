const supertest = require('supertest');
const { expect } = require('chai');
const Op = require('sequelize').Op;
const Models = require('sequelize/models');
const { hash } = require('util/bcrypt');
const server = require('server');
const { toJSON } = require('util/test');
const errorConst = require('const/errors');

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

  describe('Authorization', () => {
    it('should not register user due to missing phone number', async () => {
      const user = {}

      const result = await supertest(server)
        .post('/user/register')
        .send(user)
        .expect(400);

      expect(result.error.text).to.equal(errorConst.INVALID_USER);
    })

    it('should not register user due to existing user', async () => {
      await User.build(testUser).save();

      const result = await supertest(server)
        .post('/user/register')
        .send({
          phoneNumber,
          password: '1234'
        })
        .expect(400);

      expect(result.error.text).to.equal(errorConst.INVALID_USER_NUMBER);
    })

    it('should successfully register user', async () => {
      await supertest(server)
        .post('/user/register')
        .send({
          phoneNumber: phoneNumber,
          password: '1234'
        })
        .expect(200);

      const user = await User.findOne({
        where: {
          phoneNumber: {
            [Op.contains]: [phoneNumber]
          }
        }
      })
      const parsedUser = user.toJSON()

      expect(parsedUser.phoneNumber).to.deep.equal([phoneNumber]);
    })

    it('should not login due to missing user', async () => {
      const data = {
        phoneNumber: '+12345678901',
        password: ''
      }

      const result = await supertest(server)
        .post('/user/login')
        .send(data)
        .expect(404);

      expect(result.error.text).to.equal(errorConst.USER_NOT_FOUND);
    })

    it('should not login due to wrong password', async () => {
      await User.build(testUser).save();

      const data = {
        phoneNumber: testUser.phoneNumber,
        password: 'blabla'
      }

      const result = await supertest(server)
        .post('/user/login')
        .send(data)
        .expect(400);

      expect(result.error.text).to.equal(errorConst.INVALID_PASSWORD);
    })

    it('should successfully login', async () => {
      await User.build(testUser).save();

      const data = {
        phoneNumber: testUser.phoneNumber,
        password
      }

      const result = await supertest(server)
        .post('/user/login')
        .send(data)
        .expect(200);
    })
  })

  describe('List', () => {
    it('should return users list', async () => {
      await User.build(testUser).save();

      const allUsers = toJSON(await User.findAll());
      const result = await supertest(server)
        .get('/user/list')
        .expect(200);

      expect(allUsers).to.deep.equal(result.body);
    })
  });
});
