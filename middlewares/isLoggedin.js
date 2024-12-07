const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const isLogged = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.error("No token provided. Redirecting to login.");
            return res.redirect("/");
        }

        const decoded = jwt.verify(token, process.env.JWT_STRING);
        
        const user = await userModel.findOne({ email: decoded.email }).select("-password");
        if (!user) {
            console.error("User not found. Redirecting to login.");
            return res.redirect("/");
        }

        req.user = user;

        next();
    } catch (err) {
        console.error("JWT verification failed or error fetching user:", err.message);
        res.clearCookie("token");
        res.redirect('/');
    }
};

module.exports = {
    isLogged,
};