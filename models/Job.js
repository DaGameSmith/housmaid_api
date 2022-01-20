const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");

const Job = sequelize.define('Job', {
  // Model attributes are defined here
  details: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});

module.exports = Job;