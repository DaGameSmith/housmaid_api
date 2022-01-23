const sequelize = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator');
const AWS = require("aws-sdk");
const { v4 } = require("uuid");
const dotenv = require('dotenv');
dotenv.config();
const User = require("../models/User");
const Otp = require("../models/Otp");
const maxAge = 1 * 24 * 60 * 60;



const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
AWS.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

// signup section
module.exports.signupWorker = async (req, res) => {
    const {name, email, password, gender, mobileNumber, dateOfBirth} = req.body;
    try{
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
    } catch(e){
        res.status(400).json({error: e.message});
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

module.exports.sendOtp = async(req, res) => {
    
    try{
        const newUser = await User.findOne({ where: { id: req.user.id }});
        const genOtp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        console.log(genOtp);
        const existingOtp = await Otp.findOne({ where: { UserId: newUser.id } });
        if(existingOtp){
            await Otp.destroy({
                where: {
                UserId: newUser.id,
                }
            });
        }
        const otp = await Otp.create({UserId: newUser.id, otp: genOtp});
        const params = {
            Message: "the verification code is " + otp.otp,
            PhoneNumber: '+' + newUser.mobileNumber,
            MessageAttributes: {
                'AWS.SNS.SMS.SenderID': {
                    'DataType': 'String',
                    'StringValue': "housmaid1"
                }
            }
        };

        const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

        publishTextPromise.then(
            function (data) {
                res.status(200).json({ MessageID: data.MessageId });
            }).catch(
                function (err) {
                    res.status(400).json({Error: err });
            });
    } catch(e) {
        res.status(400).json({error: e.message});
    }
}

module.exports.verifyOtp = async(req, res) => {
    const {otpCode} = req.body;
    try{
        const otp = await Otp.findOne({ where: { UserId: req.user.id }});
        if(otp === null || otp.isUsed){
            console.log("code does not exist");
            res.status(400).json({message: "code does not exist"});
        } else {
            if(otp.otp !== otpCode){
                console.log("invalid code");
                res.status(400).json({message: "invalid code"});
            }
            await otp.update({ isUsed: true });
            await User.update({ verified: true }, {
                where: {
                id: req.user.id
                }
            });
            res.status(200).json({message: "otp verification successful"});
        }
    } catch(e){
        res.status(400).json({error: e.message});
    }
}



//login section
module.exports.loginWorker = async(req, res) => {
    const {email, password} = req.body;
    try{
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
    } catch(e) {
        res.status(400).json({error: e.message});
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