const express = require("express");
const router = express.Router();
const shopModel = require("../models/shop-model");
const ownerModel = require("../models/owner-model");
const productModel = require('../models/product-model')

router.post("/addshop", async (req, res) => {
    try {
        const { ownerName, ownerNo, ownerEmail, shopName, shopAddress } = req.body;

        if (!ownerName || !ownerNo || !shopName || !shopAddress || !ownerEmail) {
            return res.render('add-shop', {
                errorMessage: "All fields are required.",
                successMessage: "Nothing"
            });
        }

        const owner = await ownerModel.findOne({ email: ownerEmail });

        if (!owner) {
            return res.render('add-shop', {
                errorMessage: "Owner email does not exist. Please register first.",
                successMessage: "Nothing"
            });
        }

        const existingShop = await shopModel.findOne({
            ownerEmail: ownerEmail,
            shopName: shopName
        });

        if (existingShop) {
            return res.render('add-shop', {
                errorMessage: "A shop with this name already exists for this owner.",
                successMessage: "Nothing"
            });
        }

        const ownername = owner.fullName || "Owner Name Is Not Provided";

        await shopModel.create({
            ownerName,
            ownerNo,
            shopName,
            shopAddress,
            ownerEmail,
            owner: owner._id
        });

        const products = await productModel.find();

        return res.status(200).render('showproducts', {
            successMessage: "Shop registered successfully!",
            errorMessage: "Nothing",
            owner: ownername,
            shop: shopName,
            products: products
        });
    } catch (err) {
        console.error("Error occurred:", err);
        return res.status(500).render('error', {
            errorMessage: "An unexpected error occurred. Please try again later.",
            successMessage: "Nothing"
        });
    }
});


router.post('/addproduct', async (req, res) => {
    try {
        const product = await productModel.create(productData);

        await shopModel.findByIdAndUpdate(shopId, { $push: { products: product._id } });

        console.log('Product added to shop successfully');
    } catch (error) {
        console.error('Error adding product to shop:', error);
    }
})
module.exports = router;
