module.exports = (sequelize, DataTypes) => {
  const ParentHasSon = sequelize.define('parent_has_son', {
    id_parent_has_son: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  ParentHasSon.associate = function (models) {
    ParentHasSon.belongsTo(models.parent, {
      foreignKey: 'id_parent',
      as: 'Parent'
    });
  };

  ParentHasSon.associate = function (models) {
    ParentHasSon.belongsTo(models.son, {
      foreignKey: 'id_son',
      as: 'Son'
    });
  };
  return ParentHasSon;
};