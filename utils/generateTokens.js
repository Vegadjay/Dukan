const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            username: user.username,
            id: user._id
        },
        process.env.JWT_STRING,
        { expiresIn: '1h' }
    );
}

module.exports = generateToken;