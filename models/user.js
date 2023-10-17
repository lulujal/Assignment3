'use strict';
const {Model} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Photo)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Username already exists'
          },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Username cannot be empty'
          }
        }
    },
    email: {
      type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'email already exists'
          },
        validate: {
          notEmpty: {
            args: true,
            msg: 'email cannot be empty'
          }
        }
    },
    password:{
      type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'password cannot be empty'
          }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async function (user,opt) {
        try {
          const hashedPassword = await hashPassword(user.password)
          user.password = hashedPassword
          return user
        } catch (err) {
          console.log(err)
        }
      }
    }
  });
  return User;
};