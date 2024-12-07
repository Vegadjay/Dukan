const express = require("express");
const isLoggedin = require('../middlewares/isLoggedin');
const router = express.Router();
const productModel = require("../models/product-model");

// Login page route
router.get("/", (req, res) => { 
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("login", { successMessage, errorMessage });
});

// Shop page route (only for logged-in users)
router.get("/shop", isLoggedin, async (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    let products = await productModel.find();
    res.render("shop", { products, successMessage, errorMessage });
});

// Error page route
router.get("/error", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("errorPage", { successMessage, errorMessage });
});

module.exports = router;
