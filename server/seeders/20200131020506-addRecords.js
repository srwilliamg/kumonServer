'use strict';
const arrayRecords = require(__dirname + '/../seedData/records.json');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('records', arrayRecords, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('records', null, {});
  }
};
