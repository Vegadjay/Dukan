const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokens");
const ownerModel = require("../models/owner-model");

// Register owner
const regiseterOwner = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const existingOwner = await ownerModel.findOne({ email });
        if (existingOwner) {
            return res.status(400).send("Owner already exists");
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
        res.status(201).send("Owner registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

// Login owner
const loginOwner = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await ownerModel.findOne({ email });
        if (!user) {
            return res.status(400).send("Owner not found");
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
        res.status(200).send("Owner logged in successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

module.exports = {
    regiseterOwner,
    loginOwner,
};
