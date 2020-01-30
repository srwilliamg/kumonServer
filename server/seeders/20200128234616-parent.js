'use strict';
const arrayParents = require(__dirname + '/../seedData/parents.json');
const arraySons = require(__dirname + '/../seedData/sons.json');
const arrayParentHasSons = require(__dirname + '/../seedData/parent_has_sons.json');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('parents', arrayParents, {});
    await queryInterface.bulkInsert('sons', arraySons, {});
    return await queryInterface.bulkInsert('parent_has_sons', arrayParentHasSons, {});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('parent_has_sons', null, {});
    queryInterface.bulkDelete('sons', null, {});
    return queryInterface.bulkDelete('parents', null, {});
  }
};
