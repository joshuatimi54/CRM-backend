const jwt = require('jsonwebtoken');


const generateRefreshToken = (id) => {
    return jwt.sign({id}, process.env.MONGO_DB_SECRET, {expiresIn: '1d'})
};

module.exports = generateRefreshToken