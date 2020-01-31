const dbnames = require(__dirname + '/../constants/databaseNames.json');
module.exports = (sequelize, DataTypes) => {
  const Son = sequelize.define(dbnames.tables.son, {
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
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
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
    // freezeTableName: true,
  });

  Son.associate = function (models) {
    Son.belongsToMany(models.parent, {
      through: dbnames.tables.parent_has_son,
      foreignKey: dbnames.columns.son.id_son,
      as: dbnames.tables.son
    })
    // creates a foreignKey on specified model 
    Son.hasMany(models.record, {
      foreignKey: 'id_son',
      as: dbnames.tables.record
    })
  };

  return Son;
};