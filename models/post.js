const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    device: {
        type: String,
        required: true
    },
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;