const { DataTypes } = require("sequelize");
const { sequelize } = require("./db/db");
const { Group } = require("../models");

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Group",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Group;
