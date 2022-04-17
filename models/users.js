'use strict';
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate({ Orders }) {
      this.hasMany(Orders, {
        foreignKey: 'userId',
        as: 'orders'
      });
    }
    toJSON() {
      return {
        ...this.get(),
        password: undefined
      }
    }
  };

  Users.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sms_code: {
      type: DataTypes.STRING
    },
    isVerified: {
      type: DataTypes.BOOLEAN
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone_number: {
      type: DataTypes.INTEGER
    },
    password: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING
    },
    image_isAdded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
    {
      sequelize,
      tableName: 'users',
      modelName: 'Users',
    });

  return Users;
};