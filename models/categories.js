'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate({ Products, Brands }) {
      this.belongsToMany(Products, {
        through: 'ProductsandCategories',
        foreignKey: 'categoryId',
        as: 'product'
      });
      this.belongsToMany(Brands, {
        through: 'Categoriesandbrands',
        foreignKey: 'categoryId',
        as: 'brands'
      });
    }
  };
  Categories.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    image_isAdded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    tableName: 'categories',
    modelName: 'Categories',
  });
  return Categories;
};