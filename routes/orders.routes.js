const express = require("express");
const router = express.Router();
const orderModel = require("../models/order-model");

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

        const transformedOrders = orders.map(order => {
            const orderObj = order.toObject();

            if (orderObj.productId && orderObj.productId.image) {
                orderObj.productImageBase64 = orderObj.productId.image.toString('base64');
            }

            orderObj.productName = orderObj.productId ? orderObj.productId.name : 'Unknown Product';
            orderObj.totalAmount = orderObj.productId ? orderObj.productId.price : 0;

            return orderObj;
        });

        res.render("orders", {
            orders: transformedOrders,
            user: req.user
        });
    } catch (err) {
        console.error("Error fetching shop orders:", err);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
