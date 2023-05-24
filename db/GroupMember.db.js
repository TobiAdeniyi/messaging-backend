const { DataTypes } = require("sequelize");
const { sequelize } = require("./db/db");
const { GroupMember, Group, User } = require("../models");

GroupMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Group,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    moduleName: "GroupMember",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = GroupMember;
