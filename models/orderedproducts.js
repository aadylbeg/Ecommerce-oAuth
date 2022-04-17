'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderedProducts extends Model {
    static associate({ Products, Orders }) {
      this.belongsTo(Products, {
        foreignKey: 'productId',
        as: 'products'
      });
      this.belongsTo(Orders, {
        foreignKey: 'orderId',
        as: 'order_products'
      });
    }
  };
  OrderedProducts.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    price: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderedProducts',
    tableName: 'orderedProducts'
  });
  return OrderedProducts;
};