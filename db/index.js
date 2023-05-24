const { sequelize, Sequelize } = require("./db");
const GroupMember = require("./GroupMember.db");
const Group = require("./Group.db");
const User = require("./User.db");

/**
 * A single user can ba an admin for multiple groups
 */
User.hasMany(Group, { foreignKey: "admin" });
Group.belongsTo(User, { foreignKey: "admin" });

/**
 * Many users can be a member of multiple groups
 * - this means each user is associated with a member (if in a group)
 * - and a user (as a member) can be a member of multiple groups (if in a the group)
 */
Group.belongsToMany(User, { through: GroupMember });
User.belongsToMany(Group, { through: GroupMember });

module.exports = { sequelize, Sequelize, GroupMember, Group, User };
