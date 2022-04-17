'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brands extends Model {
    static associate({ Products, Categories }) {
      this.hasMany(Products, {
        foreignKey: 'brandId',
        as: 'brand'
      });
      this.belongsToMany(Categories, {
        through: 'Categoriesandbrands',
        foreignKey: 'brandId',
        as: 'categories'
      });
    }
  };
  Brands.init({
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
    }
  }, {
    sequelize,
    tableName: 'brands',
    modelName: 'Brands',
  });
  return Brands;
};