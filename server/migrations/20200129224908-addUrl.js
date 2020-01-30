'use strict';
const dbnames = require(__dirname + '/../constants/databaseNames.json');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('sons', dbnames.columns.son.image_url, {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('sons', dbnames.columns.son.image_url, { transaction: t }),
      ]);
    });
  }
};