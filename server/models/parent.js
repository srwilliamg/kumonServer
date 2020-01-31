'use strict';
const bcrypt = require('bcrypt');
const dbnames = require(__dirname + '/../constants/databaseNames.json');

module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define(dbnames.tables.parent, {
    id_parent: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$", 'i'],
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$", 'i'],
        notEmpty: true,
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$", 'i'],
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please enter a correct email."
        },
        notEmpty: {
          msg: "Email cannot be empty."
        },
        isUnique: function (value, next) {
          const field = dbnames.columns.parent.email;
          var query = {};
          query[field] = value;
          Parent.find({
            where: query,
            attributes: [dbnames.columns.parent.email]
          }).then(function (obj) {
            if (obj) {
              next(field + ' "' + value + '" is already in use');
            } else {
              next();
            }
          });
        }
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      isDate: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      validate: {
        isDate: true,
      }
    },
  }, {
    timestamps: true,
    // freezeTableName: true,
    hooks: {
      beforeCreate: (parent, options) => {
        {
          parent.password = parent.password && parent.password != "" ? bcrypt.hashSync(parent.password, 10) : "";
        }
      }
    }
  });

  Parent.associate = function (models) {
    Parent.belongsToMany(models.son, {
      through: dbnames.tables.parent_has_son,
      foreignKey: dbnames.columns.parent.id_parent,
      as: dbnames.tables.parent
    });
  };

  return Parent;
};