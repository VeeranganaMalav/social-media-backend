const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();

const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.log(err);
        });

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});