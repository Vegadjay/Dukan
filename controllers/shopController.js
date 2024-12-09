const express = require("express");
const router = express.Router();
const shopModel = require("../models/shop-model");
const ownerModel = require("../models/owner-model"); // Assuming you have an owner model

router.post("/addshop", async (req, res) => {
    try {
        const { ownerName, ownerNo, ownerEmail, shopName, shopAddress } = req.body;

        // Validate all fields
        if (!ownerName || !ownerNo || !shopName || !shopAddress || !ownerEmail) {
            return res.render('shopRegistration', {
                errorMessage: "All fields are required.",
                successMessage: ""
            });
        }

        // Verify if the email exists in the owner model
        const owner = await ownerModel.findOne({ email: ownerEmail });
        if (!owner) {
            return res.render('shopRegistration', {
                errorMessage: "Owner email does not exist. Please register first.",
                successMessage: ""
            });
        }

        // Check if shop already exists for this owner
        const existingShop = await shopModel.findOne({
            ownerEmail: ownerEmail,
            shopName: shopName
        });

        if (existingShop) {
            return res.render('shopRegistration', {
                errorMessage: "A shop with this name already exists for this owner.",
                successMessage: ""
            });
        }

        // Create new shop
        const shop = await shopModel.create({
            ownerName,
            ownerNo,
            shopName,
            shopAddress,
            ownerEmail,
            owner: owner._id // Link shop to owner's ID
        });

        // Redirect with success message
        return res.render('shopRegistration', {
            successMessage: "Shop registered successfully!",
            errorMessage: ""
        });

    } catch (err) {
        console.error("Error occurred:", err);
        return res.render('shopRegistration', {
            errorMessage: "An error occurred while registering the shop.",
            successMessage: ""
        });
    }
});

module.exports = router;