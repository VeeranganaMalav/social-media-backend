const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../models/user");

require('dotenv').config();

let jwtSecretKey = process.env.JWT_SECRET_KEY;
let tokenExpiration = process.env.TOKEN_EXPIRATION;

module.exports.createUser = async (req, res) => {
    try {
        let { name, email, gender, password } = req.body;

        let hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.create({
            name,
            email,
            gender,
            password: hashedPassword
        });

        res.status(201).send(user);
    }
    catch (err) {
        res.status(500).send("Error while registering user");
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let existingUser = await User.findOne({ email });

        if(!existingUser){
            res.send(404).send({ message: "User not found" });
            return;
        }

        let passwordMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatch){
            res.status(401).send({ message: "You are not authorized for login" });
            return;
        }


        let token = jwt.sign({userId: existingUser._id}, jwtSecretKey, {expiresIn: tokenExpiration});

        res.status(200).send({token: token, user: existingUser});
    }
    catch (err) {
        res.status(500).send("Error while logging in the user");
    }
}

module.exports.userPosts = async (req, res) => {
    try {
        let userId = req.userId;
        // console.log(userId);

        let user = await User.findById(userId).populate('posts');
        console.log(user);

        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send("Error while retrieving user posts");
    }
}

// module.exports.logout = async (req, res) => {
//     try {
//         let token = req.headers.authorization.split(' ')[1];

//         let existingUser = await User.findOne({ email });

//         if(!existingUser){
//             res.send(404).send({ message: "User not found" });
//             return;
//         }

//         let passwordMatch = await bcrypt.compare(password, existingUser.password);

//         if(!passwordMatch){
//             res.status(401).send({ message: "You are not authorized for login" });
//             return;
//         }

//         res.status(200).send({ message: "User logged out successfully" });
//     }
//     catch (err) {
//         res.status(500).send("Error while logging out the user");
//     }
// }