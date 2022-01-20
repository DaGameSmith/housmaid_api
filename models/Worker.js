const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");

const Worker = sequelize.define('Worker', {
  // Model attributes are defined here
  cv: {
    type: DataTypes.TEXT,
  },
  jobTypes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Avaliability: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workingHours: {
    type: DataTypes.STRING,
    allowNull: false
  },
  workExperience: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('available', 'employed'),
    defaultValue: 'available',
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPetFriendly: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  // Other model options go here
});

module.exports = Worker;