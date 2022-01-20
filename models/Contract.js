const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");

const Contract = sequelize.define('Contract', {
  // Model attributes are defined here
  details: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  salary: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  // Other model options go here
});

module.exports = Contract;