const express = require("express");
const router = express.Router();
const shopModel = require("../models/shop-model");
const ownerModel = require("../models/owner-model");
const productModel = require('../models/product-model')
const multer = require('multer');
const authenticateUser = require('../middlewares/authUser');

const storage = multer.memoryStorage();
const upload = multer({ storage });

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


router.post('/addproduct', authenticateUser, upload.single('productImage'), async (req, res) => {
    try {
        const ownerEmail = req.user.email;
        const { name, price, quantity, description, category } = req.body;

        if (!name || !price || !quantity || !description || !category || !req.file) {
            return res.status(400).json({
                error: "All fields including product image are required."
            });
        }

        const shop = await shopModel.findOne({ ownerEmail });

        if (!shop) {
            return res.status(404).json({
                error: "Shop not found for the provided owner email."
            });
        }

        const productData = {
            name,
            price,
            quantity,
            description,
            category,
            image: req.file.buffer,
            shop: shop._id
        };

        const product = await productModel.create(productData); // Corrected model usage here

        shop.products.push(product._id);
        await shop.save();

        return res.status(201).redirect('/owners/products');
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});



module.exports = router;
