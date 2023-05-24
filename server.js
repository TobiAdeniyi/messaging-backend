const app = require('./index');
const { sequelize } = require('sequelize');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  sequelize.sync({ force: false }).then(() => {
    console.log('Database synced! ✅');
  });
  console.log(`Users are ready at http://localhost:${PORT}`);
});