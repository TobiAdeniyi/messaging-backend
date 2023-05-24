const { DataTypes } = require("sequelize");
const { sequelize } = require("./db/db");
const { User } = require("../models");

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "inactive",
    },
  },
  {
    sequelize,
    moduleName: "User",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = User;
