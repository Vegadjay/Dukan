const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Import models
const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");

// Endpoint to get orders by shop name
router.get("/orders-by-shop", async (req, res) => {
    try {
        const shopName = req.query.shopName;
        if (!shopName) {
            return res.status(400).json({ error: "Shop name is required" });
        }

        const products = await productModel.find({}).populate({
            path: "shop",
            match: { name: shopName },
        });

        const productIds = products.filter(p => p.shop !== null).map(p => p._id);

        if (productIds.length === 0) {
            return res.status(404).json({ error: "No products found for this shop" });
        }

        const orders = await orderModel.find({ productId: { $in: productIds } }).populate("productId");

        res.status(200).json({
            shopName,
            orders,
        });
    } catch (error) {
        console.error("Error fetching orders by shop:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
