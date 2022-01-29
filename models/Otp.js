const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");

const Otp = sequelize.define('Otp', {
  // Model attributes are defined here
  otp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  // Other model options go here
});

module.exports = Otp;