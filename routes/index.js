const express = require("express");
const isLogged = require("../middlewares/isLoggedin");
const router = express.Router();
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("login", { successMessage, errorMessage });
});


router.get("/error", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("errorPage", { successMessage, errorMessage });
});

module.exports = router;
