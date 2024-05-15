const { DataTypes } = require('sequelize');
const sequelize = require("../config/mysql");

const Keyword = sequelize.define('keyword', {
  // Model attributfes are defined here
  word: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  ans_text1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ans_text2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ans_text3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ans_text4: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ans_img1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ans_img2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ans_img3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ans_img4: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ans_img5: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ans_num1: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  ans_num2: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  ans_num3: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  ans_num4: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  ans_json1: {
    type: DataTypes.JSON,
    defaultValue: null,
    allowNull: true
  },
  ans_json2: {
    type: DataTypes.JSON,
    defaultValue: null,
    allowNull: true
  },
  type: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
}, {
  // Other model options go here
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'datakeyword'
});

module.exports = Keyword;