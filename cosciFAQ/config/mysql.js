const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_FAQ_NAME,
  process.env.DB_FAQ_USER,
  process.env.DB_FAQ_PASS,
  {
    host: process.env.DB_FAQ_HOST,
    port: 3306,
    dialect:
      "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  }
);

module.exports = sequelize;
