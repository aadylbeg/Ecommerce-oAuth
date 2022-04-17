'use strict';
const uuid = require('uuid');
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.bulkInsert(
      'orders',
      [
        {
          uuid: uuid.v4(),
          total_price: 102,
          status: 'pending',
          address: 'Garadashly',
          user_name: 'Planmyrat',
          user_email: 'plany@gmail.com',
          user_phone: '+993',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete('orders', null, {});
  },
};
