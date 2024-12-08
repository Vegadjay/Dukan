// In a file like middleware/auth.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            req.user = null;
            return next();
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user
        const user = await userModel.findById(decoded.userId).select('-password');

        if (!user) {
            req.user = null;
            return next();
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        // If token is invalid
        req.user = null;
        next();
    }
};

module.exports = authMiddleware;