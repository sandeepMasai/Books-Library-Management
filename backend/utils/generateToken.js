const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h', 
    });
};

module.exports = {
    generateToken,
   
};