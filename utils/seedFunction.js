const { User, Group, sequelize } = require("../db");
const userSeedData = require("../data/userSeedData.json");
const groupSeedData = require("../data/groupSeedData.json");

const seed = async () => {
  await sequelize.sync({ force: true });

  // seed users
  await User.bulkCreate(userSeedData, { individualHooks: true })
    .then(() => console.log(`seeded ${userSeedData.length} users. Done ✅`))
    .catch((err) => console.error(err));

  // seed groups
  await Group.bulkCreate(groupSeedData, { individualHooks: true })
    .then(() => console.log(`seeded ${groupSeedData.length} groups.  Done ✅`))
    .catch((err) => console.error(err));

  console.log("seeded successfully, db synced! ✅");
};

module.exports = seed;
