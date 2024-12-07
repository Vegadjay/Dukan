const express = require("express");
const isLoggedin = require('../middlewares/isLoggedin');
const router = express.Router();
const productModel = require("../models/product-model");
const userModel = require("../models/user-model")
// Login page route

router.get("/", (req, res) => { 
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("login", { successMessage, errorMessage });
});

router.get("/shop", isLoggedin, async (req, res) => {
    try {
        const successMessage = req.flash("success");    
        const errorMessage = req.flash("error");
        let products = await productModel.find();
        const userId = req.session.userId;
        const user = await userModel.findById(userId);
        res.render("shop", { 
            products,
            successMessage,
            errorMessage, 
            userName: user ? user.fullName : "Guest",
            userEmail: user ? user.email : "Not Available" 
        });
    } catch (err) {
        console.error("Error fetching data:", err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/error");
    }
});


// Error page route
router.get("/error", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("errorPage", { successMessage, errorMessage });
});

module.exports = router;
