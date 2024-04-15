const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").chatbotUtility;

const Solution = sequelize.define(
  "Solution",
  {
    id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      unique: true,
    },
    related_problem: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    add_by: {
      type: DataTypes.CHAR(6),
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "solutions",
  }
);

module.exports = Solution;
