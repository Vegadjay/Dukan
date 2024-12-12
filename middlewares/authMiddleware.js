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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId).select('-password');

        if (!user) {
            req.user = null;
            return next();
        }

        req.user = user;
        next();
    } catch (error) {
        req.user = null;
        next();
    }
};

module.exports = authMiddleware;