const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").chatbotUtility;

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_code: {
      type: DataTypes.CHAR(6),
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(12),
      unique: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.CHAR(6),
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "admins",
  }
);

module.exports = Admin;
