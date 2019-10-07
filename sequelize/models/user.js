const Sequelize = require('sequelize');

const { Op } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    uuid: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: 4
      }
    },
    role: {
      type: DataTypes.ENUM(0, 1, 2)
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
      unique: true
    },
    password: {
      type: DataTypes.CHAR(60)
    },
    confirmed: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    tableName: 'users',
    scopes: {
      confirmed: {
        where: { confirmed: 1 }
      },
      simpleSearch: function searchScope(search, attributes) {
        const searchQuery = search.trim().split(/\s+/)
          .map(item => attributes.map(atr => ({
            [atr]: {
              [Op.like]: `%${item}%`
            }
          })));
        return {
          where: {
            [Op.or]: searchQuery.concat.apply([], searchQuery)
          }
        };
      }
    }
  });
  user.associate = () => {
    // associations can be defined here
  };
  return user;
};
