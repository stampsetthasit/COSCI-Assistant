const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").chatbotUtility;

const Request = sequelize.define(
  "Request",
  {
    req_id: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    req_title: {
      type: DataTypes.STRING,
    },
    req_des: {
      type: DataTypes.TEXT,
    },
    req_ctg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    req_pro_room: {
      type: DataTypes.STRING,
    },
    req_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    req_by_who: {
      type: DataTypes.STRING,
    },
    req_approved_by: {
      type: DataTypes.STRING,
    },
    req_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    req_finished: {
      type: DataTypes.TIME,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "requests",
  }
);

module.exports = Request;
