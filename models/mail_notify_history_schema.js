const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").chatbotUtility;

const MailNotifyHistory = sequelize.define(
  "MailNotifyHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    req_id: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    send_to: {
      type: DataTypes.CHAR(6),
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "mail_notify_history",
  }
);

module.exports = MailNotifyHistory;
