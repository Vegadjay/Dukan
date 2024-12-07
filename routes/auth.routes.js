const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokens");
const ownerModel = require("../models/owner-model");
const userModel = require("../models/user-model");

router.post("/users/register", async (req,res) => {
    const { fullName, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
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
        res.status(201).send("User registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
router.post("/users/login",async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid password");
        }

        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: true,
        });
        res.status(200).send("User logged in successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
router.post('/owner/register', async (req,res)=>{
    const { fullName, email, password } = req.body;
    try {
        const existingUser = await ownerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Owner already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await ownerModel.create({
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
        res.status(201).send("User registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})
router.post('/owner/login', async (req,res) => {
    const { fullName, email, password } = req.body;
    try {
        const existingOwner = await ownerModel.findOne({ email });
        if (existingOwner) {
            return res.status(400).send("Owner Already Login");
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
        res.status(201).send("Owner Login successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})

module.exports = router;