const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const Post = require("../models/post");

require('dotenv').config();

let jwtSecretKey = process.env.JWT_SECRET_KEY;
let tokenExpiration = process.env.TOKEN_EXPIRATION;

module.exports.createPost = async (req, res) => {
    try {
        let { title, body, device, userId } = req.body;

        let post = await Post.create({
            title,
            body,
            device,
            userId
        });

        res.status(201).send(post);
    }
    catch (err) {
        res.status(500).send("Error while creating post");
    }
}

module.exports.updatePost = async (req, res) => {
    try {
        let { id } = req.params;

        let updatedPost = await Post.findByIdAndUpdate(id, req.body, {new:true});

        res.status(200).send(updatedPost);
    }
    catch (err) {
        res.status(500).send("Error while updating the post");
    }
}

module.exports.deletePost = async (req, res) => {
    try {
        let { id } = req.params;

        let deletedPost = await Post.findByIdAndDelete(id);

        res.status(200).send(deletedPost);
    }
    catch (err) {
        res.status(500).send("Error while deleting the post");
    }
}