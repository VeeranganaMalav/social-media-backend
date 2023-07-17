const jwt = require('jsonwebtoken');

require('dotenv').config();

let jwtSecretKey = process.env.JWT_SECRET_KEY;
let tokenExpiration = process.env.TOKEN_EXPIRATION;

const isAuthenticated = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];

    try {
        let decoded = jwt.verify(token, jwtSecretKey);
        console.log(decoded);

        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = isAuthenticated;