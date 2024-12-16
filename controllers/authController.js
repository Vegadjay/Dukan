const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokens");
const ownerModel = require("../models/owner-model");
const userModel = require("../models/user-model");
const flashMessages = require("../utils/flashMessages")
const authLogout = require("../middlewares/isLoggedin")


// User can register here
router.post("/users/register", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            req.flash("info", flashMessages.info.userExists);
            return res.status(400).send(flashMessages.info.userExists);
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            fullName,
            email,
            password: hash,
        });

        const token = generateToken(newUser);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: true,
        });
        req.flash("success", flashMessages.success.userRegistered);
        res.status(200).redirect('/users/shopdetails');
    } catch (err) {
        req.flash("error", flashMessages.error.serverError);
        res.status(500).send(flashMessages.error.serverError);
    }
});

// user can login here
router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash("error", "Please provide both email and password");
        return res.status(400).redirect('/login');
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            req.flash("error", "Invalid email or password");
            return res.status(400).redirect('/auth/pages/users/loginpage');
        }

        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        req.flash("success", flashMessages.success.userLoggedIn);
        res.status(200).redirect('/users/shopdetails');
    } catch (err) {
        req.flash("error", "An unexpected error occurred");
        res.status(500).redirect('/error');
    }
});

// owner can regitser here
router.post("/owner/register", async (req, res) => {
    const { fullName, email, password, shopAddress, contact } = req.body;

    try {
        const existingOwner = await ownerModel.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({
                success: false,
                message: "User is already Exsist",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newOwner = await ownerModel.create({
            fullName,
            email,
            password: hash,
            shopAddress,
            contact,
            shops: [],
        });


        const token = generateToken(newOwner);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(201).redirect('/owners/addshop')
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "An error occurred while registering the owner.",
        });
    }
});

// owner can login here
router.post("/owner/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const owner = await ownerModel.findOne({ email });
        if (!owner) {
            req.flash("error", flashMessages.error.ownerNotFound);
            return res.status(400).send(flashMessages.error.ownerNotFound);
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            req.flash("error", flashMessages.error.invalidCredentials);
            return res.status(400).send(flashMessages.error.invalidCredentials);
        }

        const token = generateToken(owner);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: true,
        });
        req.flash("success", flashMessages.success.ownerLoggedIn);
        res.status(200).redirect("/owners/products");
    } catch (err) {
        req.flash("error", flashMessages.error.serverError);
        res.status(500).send(flashMessages.error.serverError);
    }
});

// owner and user both can logout from here
router.get('/logout', function (req, res) {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })

        req.flash("success", "Logout successful. See you soon!");
        return res.redirect("/");
    } catch (err) {
        console.error("Error during logout:", err);
        req.flash("error", "An error occurred while logging out. Please try again.");
        return res.redirect("/error");
    }
})


module.exports = router;