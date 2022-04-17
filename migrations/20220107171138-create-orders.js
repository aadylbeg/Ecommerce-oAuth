'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Orders', {
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
    await queryInterface.dropTable('orders');
  }
};