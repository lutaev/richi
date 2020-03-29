const { expect } = require('chai');
const Models = require('sequelize/models');
const UserController = require('controllers/user');
const { hash } = require('util/bcrypt');

describe('Users controllers', () => {
  const { users } = Models;

  let ctx, next
  beforeEach(() => {
    ctx = {}
    next = () => {}
  })

  describe('List', () => {
    it('should return users list', async () => {
      const user = await users.build({
        role: '1',
        name: 'Admin',
        email: 'admint@emailrandom.com',
        phoneNumber: ['+11111111111'],
        password: await hash('test'),
        confirmed: true
      }).save()

      const allUsers = await users.findAll().map(item => item.toJSON());
      await UserController.getAllUsers(ctx, next)

      await user.destroy()
      expect(allUsers).to.deep.equal(ctx.body);
    })
  })
});
