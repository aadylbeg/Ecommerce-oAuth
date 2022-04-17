'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('ProductsandCategories', {
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
      productId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('productsandCategories');
  }
};