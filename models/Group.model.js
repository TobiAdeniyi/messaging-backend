const { Model } = require("sequelize");
const User = require("./User.model");

const canNotRemoveUserStr = "Cannot remove user";

class Group extends Model {
  getMembers() {
    return this.getGroupMembers();
  }

  getMemberIds() {
    return this.getMembers().map((member) => member.id);
  }

  getMembersNames() {
    return this.getMembers().map((member) => member.getName());
  }

  isMember(userId) {
    return this.getMembers().includes(userId);
  }

  isAdmin(userId) {
    return this.admin === userId;
  }

  updateAdmin(userId) {
    if (!this.isMember(userId)) {
      throw new Error("User is not a member");
    }
    this.admin = userId;
  }

  async addMembers(userId) {
    if (!(await User.findByPk(userId))) {
      throw new Error("User not found");
    }

    if (this.isMember(userId)) {
      throw new Error("User is already a member");
    }

    this.createGroupMember(userId);
  }

  removeUser(userId) {
    if (!this.isMember(userId)) {
      throw new Error(`${canNotRemoveUserStr}. User is not a member`);
    }

    if (this.getMembers().length === 1) {
      throw new Error(`${canNotRemoveUserStr}. User is the only member`);
    }

    if (this.isAdmin(userId)) {
      throw new Error(`${canNotRemoveUserStr}. User is admin`);
    }

    this.removeGroupMember(userId);
  }
}

// Add hooks
Group.beforeCreate((group, options) => {
  try {
    if (group.users.length === 0) {
      throw new Error("Group must have at least one user");
    }

    // check if all users are valid
    group.users.forEach((user) => {
      if (!this.validUser(user)) {
        throw new Error("User is not valid");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = Group;
