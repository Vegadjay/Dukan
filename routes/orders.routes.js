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
            return res.status(404).render('no-product')
        }

        // Transform orders to include necessary information
        const transformedOrders = orders.map(order => {
            const orderObj = order.toObject();

            // Add base64 image data if exists
            if (orderObj.productId && orderObj.productId.image) {
                orderObj.productImageBase64 = orderObj.productId.image.toString('base64');
            }

            // Add other necessary fields
            orderObj.productName = orderObj.productId ? orderObj.productId.name : 'Unknown Product';
            orderObj.totalAmount = orderObj.productId ? orderObj.productId.price : 0;

            return orderObj;
        });

        res.render("orders", {
            orders: transformedOrders,
            user: req.user // If you're using authentication
        });
    } catch (err) {
        console.error("Error fetching shop orders:", err);
        res.status(500).send("Internal server error");
    }
});



module.exports = router;
