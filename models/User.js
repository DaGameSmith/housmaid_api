const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");
const Worker = require("./Worker");
const Otp = require("./Otp");

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('worker', 'customer', 'admin'),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    
  },
  mobileNumber: {
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
  }
}, {
  // Other model options go here
});


User.hasOne(Worker);
Worker.belongsTo(User);

// User.hasOne(Otp);
// Otp.belongsTo(User);


module.exports = User;