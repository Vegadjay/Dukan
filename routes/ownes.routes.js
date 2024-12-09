const express = require('express');
const router = express.Router();
const productModel = require("../models/product-model")

// (/owners)

router.get('/products', async (req, res) => {
    const products = await productModel.find();
    res.render("showproducts", { products });
})

router.get('/addproduct', async (req, res) => {
    res.render("addproduct");
})

router.get('/addnewshop', async (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("add-shop", {
        successMessage,
        errorMessage
    });
})

router.get("/contactus", (req, res) => {
    res.render('contact');
})


module.exports = router