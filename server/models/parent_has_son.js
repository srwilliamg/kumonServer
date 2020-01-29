const dbnames = require(__dirname + '/../constants/databaseNames.json');
module.exports = (sequelize, DataTypes) => {
  const ParentHasSon = sequelize.define(dbnames.tables.parent_has_son, {
    id_parent_has_son: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: true,
    // freezeTableName: true,
  });

  ParentHasSon.associate = function (models) {
    ParentHasSon.belongsTo(models.parent, {
      foreignKey: dbnames.columns.parent.id_parent,
      as: dbnames.tables.parent
    });
  };

  ParentHasSon.associate = function (models) {
    ParentHasSon.belongsTo(models.son, {
      foreignKey: dbnames.columns.son.id_son,
      as: dbnames.tables.son
    });
  };
  return ParentHasSon;
};