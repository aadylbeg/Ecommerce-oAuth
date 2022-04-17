'use strict';
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.bulkInsert(
      'admin',
      [
        {
          uuid: uuid.v4(),
          username: 'admin',
          password: await bcrypt.hash('admin', 12)
        },
      ],
      {}
    );
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete('admin', null, {});
  },
};
