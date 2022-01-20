const sequelize = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const dotenv = require('dotenv');
dotenv.config();
const User = require("../models/User");
const maxAge = 1 * 24 * 60 * 60;

// signup section
module.exports.signupWorker = async (req, res) => {
    const {name, email, password, gender, mobileNumber, dateOfBirth} = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser === null) {
        const id = v4();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ id, name, email, password: hashedPassword, gender, role: "worker", mobileNumber, dateOfBirth });
        if(newUser){
            const jwtToken =  jwt.sign(
                {
                    id: newUser.id, 
                    email: newUser.email, 
                    role: newUser.role
                }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: maxAge,
                }
            );
            console.log("signup successful");
            res.status(200).json({
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    token: jwtToken,
                }
            });
        }
    } else {
        console.log('email already exists!');
        res.status(404).json({error: "email already exists"});
    }
}

module.exports.signupCustomer = async(req, res) => {
    const {name, email, password, gender, mobileNumber, dateOfBirth} = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser === null) {
        const id = v4();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({id, name, email, password: hashedPassword, gender, role: "customer", mobileNumber, dateOfBirth });
        if(newUser){
            const jwtToken =  jwt.sign(
                {
                    id: newUser.id, 
                    email: newUser.email, 
                    role: newUser.role
                }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: maxAge,
                }
            );
            console.log("signup successful");
            res.status(200).json({
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    token: jwtToken,
                }
            });
        }
    } else {
        console.log('email already exists!');
        res.status(404).json({error: "email already exists"});
    }
}

module.exports.signupAdmin = async(req, res) => {
    const {name, email, password, gender, mobileNumber, dateOfBirth} = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser === null) {
        const id = v4();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({id, name, email, password: hashedPassword, gender, role: "admin", mobileNumber, dateOfBirth });
        if(newUser){
            const jwtToken =  jwt.sign(
                {
                    id: newUser.id, 
                    email: newUser.email, 
                    role: newUser.role
                }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: maxAge,
                }
            );
            console.log("signup successful");
            res.status(200).json({
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    token: jwtToken,
                }
            });
        }
    } else {
        console.log('email already exists!');
        res.status(404).json({error: "email already exists"});
    }
}





//login section
module.exports.loginWorker = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user === null) {
        console.log('user does not exist, please register as a user.');
        res.status(404).json({error: "user does not exist."});
    } else {
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            console.log("incorrect password, please enter correct password");
            res.status(400).json({error: "incorrect password"});
        }
        if(user.role === "worker"){
            const jwtToken =  jwt.sign(
                {
                    id: user.id, 
                    email: user.email, 
                    role: user.role
                }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: maxAge,
                }
            );
            console.log("login successful");
            res.status(200).json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: jwtToken
                }
            });
        } else{
            console.log("user is not authorized");
            res.status(400).json({error: "unauthorized"});
        }
    }
}

module.exports.loginCustomer = async(req, res) => {
    const {name, email} = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user === null) {
        console.log('user does not exist, please register as a user.');
        res.status(404).json({error: "user does not exist."});
    } else {
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            console.log("incorrect password, please enter correct password");
            res.status(400).json({error: "incorrect password"});
        }
        if(user.role === "customer"){
            const jwtToken =  jwt.sign(
                {
                    id: user.id, 
                    email: user.email, 
                    role: user.role
                }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: maxAge,
                }
            );
            console.log("login successful");
            res.status(200).json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: jwtToken
                }
            });
        } else{
            console.log("user is not authorized");
            res.status(400).json({error: "unauthorized"});
        }
    }
}

module.exports.loginAdmin = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user === null) {
        console.log('user does not exist, please register as a user.');
        res.status(404).json({error: "user does not exist."});
    } else {
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
            console.log("incorrect password, please enter correct password");
            res.status(400).json({error: "incorrect password"});
        }
        if(user.role === "admin"){
            // const maxAge = 1 * 24 * 60 * 60;
            const jwtToken =  jwt.sign(
                {
                    id: user.id, 
                    email: user.email, 
                    role: user.role
                }, 
                process.env.JWT_SECRET,
                {
                    expiresIn: maxAge,
                }
            );
            console.log("login successful");
            res.status(200).json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: jwtToken
                }
            });
        } else{
            console.log("user is not authorized");
            res.status(400).json({error: "unauthorized"});
        }
    }
}