const express = require('express');
const { createPost, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();

router.post("/addPost", createPost);
// router.get("/", );
router.patch("/update", updatePost);
router.delete("/delete", deletePost);

module.exports = router;