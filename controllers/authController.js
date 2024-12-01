const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateTokens')
const userModel = require("../models/user-model")

const regiseterUser = async (req,res) => {
    const { fullName, email, password } = req.body;
    
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.send("User is exist");
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_COUNT));
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            fullName,
            email,
            password: hash,
        });

        let token = generateToken(user);

        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite:true 
        });

        res.status(200).render('shop')

    } catch(err) {
        console.error(err); 
        res.status(500).json({ 
            message: "Server Error", 
            error: err.message 
        });
    }
}

const loginUser = async (req,res) => {
    const { email,password } = req.body;
    try {
        const user = await userModel.findOne({email: email});
             if(!user) return res.status(500).error("Email Or Password is incorrect ! ");
        
            bcrypt.compare(password, user.password, function(err,result) {
                if(result) {
                    let token = generateToken(user);
                    res.cookie('token',token);
                    res.render("shop");     
                }
                else {
                    res.status(500).error("Email Or Password is incorrect ! ");
                }
            });
        }
         catch (err) {
            res.send(err);
        }
}

module.exports = {
    regiseterUser,
    loginUser
};