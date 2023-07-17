const express = require('express');
const { createUser, loginUser, userPosts } = require('../controllers/userController');
const isAuthenticated = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
// router.post("/logout", );
router.get("/posts", isAuthenticated, userPosts);

module.exports = router;