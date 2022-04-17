'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoriesandbrands extends Model {
    static associate() {
    }
  };
  Categoriesandbrands.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    brandId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    tableName: 'сategoriesandbrands',
    modelName: 'Categoriesandbrands',
  });
  return Categoriesandbrands;
};