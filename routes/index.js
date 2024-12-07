const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();
const productModel = require("../models/product-model");

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
        const products = await productModel.find();

        const userName = req.user.fullName;
        const userEmail = req.user.email;

        res.render("shop", { 
            products,
            successMessage,
            errorMessage, 
            userName,
            userEmail
        });
    } catch (err) {
        console.error("Error fetching products:", err.message);
        req.flash("error", "Unable to load products. Please try again.");
        res.redirect("/error");
    }
});

router.get("/error", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("errorPage", { successMessage, errorMessage });
});

module.exports = router;
