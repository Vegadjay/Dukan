const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model")
const authUser = require("../middlewares/authUser")


router.get("/shopdetails", authUser, async (req, res) => {
    try {
        const successMessage = req.flash("success");
        const errorMessage = req.flash("error");
        const products = await productModel.find();
        res.render("user-show-product", {
            products,
            successMessage,
            errorMessage,
        });

    } catch (err) {
        req.flash("error", "Unable to load products. Please try again.");
        console.error(err);
        res.redirect("/error");
    }
});


router.get("/items", (req, res) => {
    const products = productModel.find();

    res.render("user-show-product", { products })
})


module.exports = router