const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const productModel = require("../models/product-model")
const shopModel = require("../models/shop-model")
const ownerModel = require('../models/owner-model');
const authenticateUser = require('../middlewares/authUser');

// (/owners)



router.get('/products', authenticateUser, async (req, res) => {
    try {
        const userEmail = req.user.email;

        const owner = await ownerModel.findOne({ email: userEmail });
        if (!owner) {
            return res.status(404).json({
                error: "Owner not found",
                message: "No owner account associated with this email"
            });
        }

        const shop = await shopModel.findOne({ ownerEmail: userEmail });
        if (!shop) {
            return res.status(404).render('showproducts', {
                error: "No shop found",
                products: [],
                shopName: "No Shop",
                ownerName: owner.fullName || "Unknown Owner"
            });
        }

        const products = await productModel.find({ shop: shop._id });

        res.render("showproducts", {
            products,
            shopName: shop.shopName || "Unnamed Shop",
            ownerName: owner.fullName || "Unknown Owner"
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).render('error', {
            error: "Internal Server Error",
            message: "Unable to fetch products"
        });
    }
});

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