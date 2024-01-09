const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").chatbotUtility;

const User = sequelize.define(
  "User",
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
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING,
    },
    picture_url: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    is_follow: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    allow_notify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      defaultValue: "user",
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "users",
  }
);

module.exports = User;
