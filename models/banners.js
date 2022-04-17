'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banners extends Model {
    static associate() {
    }
  };
  Banners.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title_tm: {
      type: DataTypes.STRING
    },
    description_tm: {
      type: DataTypes.STRING
    },
  },
    {
      sequelize,
      tableName: 'banners',
      modelName: 'Banners',
    });
  return Banners;
};