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
            req.flash('error', 'User already exists');
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
        req.flash('error', 'Server error. Please try again.');
        res.redirect('/register');
    }
};

const regiseterOwner = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser = await ownerModel.findOne({ email });
        if (existingUser) {
            req.flash('error', 'User already exists');
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
        req.flash('error', 'Server error. Please try again.');
        res.redirect('/register');
    }
};


// login routes
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await ownerModel.findOne({ email });
        if (!user) {
            req.flash('error', 'Email or password is incorrect');
            res.redirect('/'); 
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Email or password is incorrect');
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
        req.flash('error', 'Server error. Please try again.');
        res.redirect('/'); 
    }
};

const loginOwner = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash('error', 'Email or password is incorrect');
            res.redirect('/'); 
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Email or password is incorrect');
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
        req.flash('error', 'Server error. Please try again.');
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