const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");

const City = sequelize.define('City', {
  // Model attributes are defined here
  cityName: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});

module.exports = City;