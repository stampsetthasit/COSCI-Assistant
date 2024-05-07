const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").chatbotUtility;

const Notify = sequelize.define(
  "Notify",
  {
    user_code: {
      type: DataTypes.CHAR(6),
      unique: true,
      allowNull: false,
    },
    emergency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    news: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "notify",
  }
);

module.exports = Notify
