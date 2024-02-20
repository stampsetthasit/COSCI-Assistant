const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").chatbotUtility;

const Broadcast = sequelize.define(
  "Broadcast",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    broadcaster: {
      type: DataTypes.CHAR(6),
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "broadcasts",
  }
);

module.exports = Broadcast;
