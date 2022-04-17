'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
      price: {
        type: DataTypes.INTEGER
      },
      given_price: {
        type: DataTypes.INTEGER
      },
      discount: {
        type: DataTypes.INTEGER
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: DataTypes.STRING
      },
      brandId: {
        type: DataTypes.INTEGER
      },
      stock_quantity: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('products');
  }
};