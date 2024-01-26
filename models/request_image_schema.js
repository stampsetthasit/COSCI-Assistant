const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").chatbotUtility;

const RequestImage = sequelize.define(
  "RequestImage",
  {
    req_id: {
      type: DataTypes.STRING(16),
      primaryKey: true,
      allowNull: false,
    },
    req_img_name: {
      type: DataTypes.STRING(32),
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "requests_images",
  }
);

module.exports = RequestImage;
