const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const isLogged = async (req,res,next) => {
    if(!req.cookies.token) {
        return res.redirect("/");
    }
    try {
        const decode = jwt.verify(req.cookies.token, process.env.JWT_STRING);
        const user = await userModel.findOne({email:decode.email}).select("-password");
        req.user = user;
        next();
    } catch(err) {
        res.redirect('/');
    }
}

module.exports = isLogged;