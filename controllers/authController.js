const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateTokens');
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model")


// register routes
const regiseterUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.redirect('/register');
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_COUNT, 10));
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            fullName,
            email,
            password: hash,
        });

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
        });

        res.redirect('/shop');

    } catch (err) {
        console.error(err);
        res.redirect('/register');
    }
};

const regiseterOwner = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser = await ownerModel.findOne({ email });
        if (existingUser) {
            return res.redirect('/register');
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_COUNT, 10));
        const hash = await bcrypt.hash(password, salt);

        const user = await ownerModel.create({
            fullName,
            email,
            password: hash,
        });

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
        });

        res.redirect('/shop');

    } catch (err) {
        console.error(err);
        res.redirect('/register');
    }
};


// login routes
const loginUser = async (req, res) => {
    
    const { email } = req.body; 
    try {
        const user = await ownerModel.findOne({ email });
        if (!user) {
            res.redirect('/'); 
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.redirect('/'); 
        }
        res.setHeader('Content-Type', 'text/plain')
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
        });

        res.redirect('/shop');
        res.send("User is goes to shop")

    } catch (err) {
        console.log(err);
        res.redirect("/error");
        res.send("User is goes to error")
    }
};

const loginOwner = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.redirect('/'); 
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.redirect('/'); 
        }

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
        });

        res.redirect('/shop');

    } catch (err) {
        console.error(err);
        res.redirect('/'); 
    }
};


const logoutUser = async (req,res) => {
    // todo: complete this route ....
}

module.exports = {
    regiseterUser,
    regiseterOwner,
    loginOwner,
    loginUser
};