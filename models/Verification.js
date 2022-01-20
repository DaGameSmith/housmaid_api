const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");

const Verification = sequelize.define('Verification', {
  // Model attributes are defined here
  verificationDate: {
    type: DataTypes.DATE,
  },
  verificationLocation: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
});

module.exports = Verification;