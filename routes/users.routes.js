const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")
const router = express.Router();

router.post("/create", async (req,res) => {
    const { fullName, email, password } = req.body;
    
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_COUNT));
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            fullName,
            email,
            password: hash,
        });

        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production' 
        });

        res.status(201).json({ 
            message: "User created successfully",
            userId: user._id 
        });

    } catch(err) {
        console.error(err); 
        res.status(500).json({ 
            message: "Server Error", 
            error: err.message 
        });
    }
});

module.exports = router;