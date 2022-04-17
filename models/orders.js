'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate({ Users, OrderedProducts }) {
      this.belongsTo(Users, {
        foreignKey: 'userId',
        as: 'user'
      });
      this.hasMany(OrderedProducts, {
        foreignKey: 'orderId',
        as: 'order_products'
      });
    }
  };
  Orders.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    total_price: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    address: {
      type: DataTypes.STRING
    },
    user_name: {
      type: DataTypes.STRING
    },
    user_email: {
      type: DataTypes.STRING
    },
    user_phone: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Orders',
    tableName: 'orders'
  });
  return Orders;
};