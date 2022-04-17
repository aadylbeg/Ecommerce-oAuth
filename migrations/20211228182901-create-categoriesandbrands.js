'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('categoriesandbrands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      brandId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('categoriesandbrands');
  }
};