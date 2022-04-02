const seedUsers = require('./user-seeds');
const coinData = require('./coins-data');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');
  await coinData();
  console.log('--------------');



  process.exit(0);
};

seedAll();
