const seed = require("./seedFunction");
const { sequelize } = require("../db");

seed()
  .then(() => console.log("Seed successful"))
  .catch((err) => console.log(err))
  .finally(() => sequelize.close());
