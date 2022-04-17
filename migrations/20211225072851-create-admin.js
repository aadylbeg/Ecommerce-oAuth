'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('admins', {
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
      username: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('admins');
  }
};