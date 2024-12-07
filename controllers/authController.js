const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokens");
const ownerModel = require("../models/owner-model");
const userModel = require("../models/user-model");
const flashMessages = require("../utils/flashMessages")

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
        res.status(200).redirect("/shop");
    } catch (err) {
        console.error(err);
        req.flash("error", flashMessages.error.serverError);
        res.status(500).send(flashMessages.error.serverError);
    }
});

router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", flashMessages.error.userNotFound);
            return res.status(400).send(flashMessages.error.userNotFound);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash("error", flashMessages.error.invalidCredentials);
            return res.status(400).send(flashMessages.error.invalidCredentials);
        }

        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: true,
        });
        req.flash("success", flashMessages.success.userLoggedIn);
        res.status(200).redirect('/shop');
    } catch (err) {
        console.error(err);
        req.flash("error", flashMessages.error.serverError);
        res.status(500).send(flashMessages.error.serverError);
    }
});

router.post("/owner/register", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const existingOwner = await ownerModel.findOne({ email });
        if (existingOwner) {
            req.flash("info", flashMessages.info.ownerExists);
            return res.status(400).send(flashMessages.info.ownerExists);
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newOwner = await ownerModel.create({
            fullName,
            email,
            password: hash,
        });

        const token = generateToken(newOwner);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: true,
        });
        req.flash("success", flashMessages.success.ownerRegistered);
        res.status(201).send(flashMessages.success.ownerRegistered);
    } catch (err) {
        console.error(err);
        req.flash("error", flashMessages.error.serverError);
        res.status(500).send(flashMessages.error.serverError);
    }
});

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
        res.status(200).send(flashMessages.success.ownerLoggedIn);
    } catch (err) {
        console.error(err);
        req.flash("error", flashMessages.error.serverError);
        res.status(500).send(flashMessages.error.serverError);
    }
});

module.exports = router;
