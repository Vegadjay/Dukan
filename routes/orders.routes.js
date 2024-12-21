const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");
router.get("/shoporder/:shopName", async (req, res) => {
    try {
        const shopName = req.params.shopName;
        const orders = await orderModel.find({ shopName }).populate({
            path: "productId",
            model: "Product",
            select: 'name price quantity category description shop createdAt image'
        });

        if (!orders || orders.length === 0) {
            return res.status(404).send("No orders found for this shop.");
        }

        const products = await productModel.find();
        const productsWithBase64 = products.map(product => {
            const productObj = product.toObject();
            if (productObj.image) {
                productObj.imageData = `data:image/jpeg;base64,${productObj.image.toString('base64')}`;
            }
            return productObj;
        });

        res.render("orders", { orders, products: productsWithBase64 });
    } catch (err) {
        console.error("Error fetching shop orders:", err);
        res.status(500).send("Internal server error");
    }
});



module.exports = router;
