module.exports = (sequelize, DataTypes) => {
  const Son = sequelize.define('son', {
    id_son: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      isDate: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      isDate: true,
    },
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  Son.associate = function (models) {
    Son.hasOne(models.parent_has_son, {
      foreignKey: 'id_son',
      as: 'Son'
    });
  };
  return Son;
};