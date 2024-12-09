const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const productModel = require("../models/product-model")
const shopModel = require("../models/shop-model")
const ownerModel = require('../models/owner-model');


// (/owners)

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] ||
        req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).redirect('/error');
        }
    } else {
        return res.status(401).send('No token provided');
    }
};

router.get('/products', authenticateUser, async (req, res) => {
    // we got email 
    // now make that email to all models
    const products = await productModel.find();
    const userEmail = req.user.email;
    const owner = await ownerModel.find({ email: userEmail })
    const ownerName = owner[0].fullName || "Name Is Not Found"
    console.log(req.user.email)
    const shop = await shopModel.find({ ownerEmail: userEmail })
    console.log(shop)
    const shopName = shop.shopName || "Name is not found";
    res.render("showproducts", { products, shop: shopName, owner: ownerName });
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