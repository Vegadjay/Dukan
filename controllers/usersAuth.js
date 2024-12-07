const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokens");
const userModel = require("../models/user-model");

// Register user
const registerUser1 = async (req, res) => {
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
};

// Login user
const loginUser1 = async (req, res) => {
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
};

module.exports = {
    registerUser1,
    loginUser1
};
