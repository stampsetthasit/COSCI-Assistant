const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").chatbotUtility;

const Problem = sequelize.define("Problem", {});
