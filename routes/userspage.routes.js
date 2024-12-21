const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model")
const authUser = require("../middlewares/authUser")


router.get("/shopdetails", authUser, async (req, res) => {
    try {
        const successMessage = req.flash("success");
        const errorMessage = req.flash("error");
        const products = await productModel.find();
        const productId = products.productId;
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



module.exports = router