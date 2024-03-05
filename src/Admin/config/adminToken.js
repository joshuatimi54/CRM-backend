const jwt = require('jsonwebtoken');


const generateToken = (id) => {
    return jwt.sign({id}, process.env.MONGO_DB_SECRET, {expiresIn: '3d'})
};

module.exports = generateToken