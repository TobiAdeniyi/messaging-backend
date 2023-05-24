const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  validPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static generateHash(password, err, salt, resolve, reject) {
    if (err) return reject(err);
    if (!salt) return bcrypt.hash(password, bcrypt.genSaltSync(10));

    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  }

  static generateSalt(password, resolve, reject) {
    return bcrypt.genSaltSync(10, (err, salt) =>
      this.generateHash(password, err, salt, resolve, reject)
    );
  }

  static cryptPassword(password) {
    return new Promise((resolve, reject) => {
      this.generateSalt(password, resolve, reject);
    });
  }
}

// Add hooks
User.beforeCreate(async (user, options) => {
  try {
    const hash = await User.cryptPassword(user.password);
    user.password = hash;
  } catch (err) {
    if (err) console.error(err);
  }
}).then(() => console.log("User --> beforeCreate --> Done ✅"));

module.exports = User;
