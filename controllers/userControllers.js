const sequelize = require("../database");
const Worker = require("../models/Worker");
const User = require("../models/User");


module.exports.setUserData = async(req, res) => {
    const {name, email, gender, dateOfBirth} = req.body;
    User.update({ name, email, gender, dateOfBirth }, {
        where: {
            id: req.user.id
        }
    }).then((user) => {
        res.status(200).json({message: "user data set successful"});
    }).catch((e) => {
        res.status(400).json({error: e.message});
    });
}