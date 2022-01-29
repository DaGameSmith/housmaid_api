const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");

const Worker = sequelize.define('Worker', {
  // Model attributes are defined here
  cv: {
    type: DataTypes.TEXT,
  },
  jobTypes: {
    type: DataTypes.STRING,
    
  },
  Avaliability: {
    type: DataTypes.STRING,
    
  },
  workingHours: {
    type: DataTypes.STRING,
    
  },
  workExperience: {
    type: DataTypes.STRING,
    
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