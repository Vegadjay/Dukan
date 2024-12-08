const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model")

router.get("/shopdetails", async (req, res) => {
    try {
        const successMessage = req.flash("success");    
        const errorMessage = req.flash("error");
        const products = await productModel.find();
        
        const userName = req.user ? req.user.fullName : "Guest";
        const userEmail = req.user ? req.user.email : "guest@example.com";

        res.render("dukan", { 
            products,
            successMessage,
            errorMessage, 
            userName,
            userEmail
        });
        
    } catch (err) {
        req.flash("error", "Unable to load products. Please try again.");
        console.error(err);
        res.redirect("/error");
    }
});

module.exports = router