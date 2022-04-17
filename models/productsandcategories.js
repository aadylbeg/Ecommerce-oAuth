'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsandCategories extends Model {
    static associate(models) {
    }
  };
  ProductsandCategories.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    productId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: null,
    tableName: 'productsandCategories',
    modelName: 'ProductsandCategories',
  });
  return ProductsandCategories;
};