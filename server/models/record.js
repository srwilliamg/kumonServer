'use strict';
const dbnames = require(__dirname + '/../constants/databaseNames.json');

module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define(dbnames.tables.record, {
    id_record: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      isDate: true,
    },
  }, {
    timestamps: false,
  });

  Record.beforeCreate((record, options) => {
    record.createdAt = new Date();
  });

  // Record.associate = function (models) {
  //  // creates a foreignKey on this table
  //   Record.belongsTo(models.son, {
  //     foreignKey: dbnames.columns.son.id_son,
  //     as: dbnames.tables.son
  //   });
  // };

  return Record;
};