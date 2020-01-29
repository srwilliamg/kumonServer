'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parent_has_sons', {
      id_parent_has_son: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_parent: {
        type: Sequelize.INTEGER,
        references: {
          model: 'parents',
          key: 'id_parent'
        }
      },
      id_son: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sons',
          key: 'id_son'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('parent_has_sons');
  }
};