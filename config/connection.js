<<<<<<< HEAD
const Sequelize = require('sequelize');

require('dotenv').config();
let sequelize;

if (process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
// create connection to our db
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: '172.19.112.1',
        dialect: 'mysql',
        port: 3306
});
}

module.exports = sequelize;
=======
const Sequelize = require("sequelize");

require("dotenv").config();
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // create connection to our db
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
>>>>>>> e10c628259312f83e271b945e01ac2ab0c03d78d
