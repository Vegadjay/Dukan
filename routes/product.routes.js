const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig")
const productModel = require("../models/product-model")
const shopModel = require("../models/shop-model");
const authenticateUser = require('../middlewares/authUser');
const orderModel = require('../models/order-model')
const userOrderModel = require('../models/user-order-model');
const userModel = require('../models/user-model');
const authMiddleware = require("../middlewares/authMiddleware");

// use for show that create page
router.get('/createproduct', (req, res) => {
    res.render("add-product");
})

// route for show product edit page
router.get('/editproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }


        res.render('edit-product', { product });
    } catch (error) {
        console.error('Error finding product:', error);
        res.status(500).send('Server error');
    }
});

// api that use for create product 
router.post('/create', authenticateUser, upload.single('productImage'), async (req, res) => {
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

        const product = await productModel.create(productData);

        shop.products.push(product._id);
        await shop.save();

        return res.status(201).redirect('/owners/products');
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

// api for edit product
router.post('/edit/:id', async (req, res) => {
    try {
        // The method is overridden to PUT
        if (req.body._method === 'PUT') {
            const productId = req.params.id;
            const { name, price, quantity, description, category } = req.body;

            const updatedProduct = { name, price, quantity, description, category };

            // Update the product in the database
            const updatedProductData = await productModel.findByIdAndUpdate(productId, updatedProduct, { new: true });

            // Redirect after successful update
            res.redirect('/owners/products');
        } else {
            res.status(400).send('Invalid method');
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).render('error');
    }
});

// api that use for show confirm delete
router.get("/deleteproduct/:id", (req, res) => {
    const productId = req.params.id;
    res.render('confirm-delete', { productId })
})

// api that delete product
router.post('/deleteproduct/:productId', async (req, res) => {
    try {
        if (req.body._method === "DELETE") {
            const { productId } = req.params;
            const { confirmCheck } = req.body;
            console.log(productId)
            if (!confirmCheck) {
                return res.status(400).json({ message: 'You must confirm deletion.' });
            }
            const product = await productModel.findByIdAndDelete(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }


            res.status(200).redirect('/owners/products');
        }



    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).render('error'); // Render error page in case of failure
    }
});

// show product details
router.get("/product/:id", (req, res) => {
    const productId = req.params.id;
    const product = productModel.findOne({ productId })
    res.render("product-details")
})

// This route is for last step for payment
router.get("/payment/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        const Image = product.image ? `data:image/jpeg;base64,${product.image.toString('base64')}` : null;

        let finalPrice = parseFloat(product.price);
        const deliveryCharge = finalPrice < 499 ? 40 : 0;
        finalPrice += deliveryCharge;

        res.render("confirm-payment", {
            productName: product.name,
            price: finalPrice,
            originalPrice: product.price,
            deliveryCharge: deliveryCharge,
            description: product.description,
            image: Image,
            productID: productId,
            hasFreeDelivery: deliveryCharge === 0
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// This route is gave details of product
router.get("/productdetails/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        const shopId = product.shop;
        const shopName = await shopModel.findById(shopId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        const Image = product.image ? `data:image/jpeg;base64,${product.image.toString('base64')}` : null;
        res.render("products", {
            product,
            Image,
            productId,
            shopName
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("An error occurred");
    }
});

// This route is add product to db
router.post("/submit-order/:id", async (req, res) => {
    try {
        const { address, paymentMethod } = req.body;
        const productId = req.params.id;

        const product = await productModel.findById(productId).populate("shop");

        if (!product) {
            return res.status(404).send("Product not found");
        }

        if (!product.shop || !product.shop.shopName) {
            return res.status(400).send("Associated shop not found or invalid");
        }

        await orderModel.create({
            productId: product._id,
            address,
            paymentMethod,
            status: "Confirmed",
            shopName: product.shop.shopName,
            product: product,
            productName: product.name,
            totalAmount: product.price,
            date: new Date(),
        });

        res.redirect("/products/order-confirmation");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }

});

// This is Order Confired page 
router.get("/order-confirmation", async (req, res) => {
    try {

        res.render("order-confirmed");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }

});

// This Route is add order to that order model 
router.post('/orderregister', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ID from cookies: ", userId);

        if (!userId) {
            return res.status(400).send("User ID not found in cookies");
        }

        const { productId, address, paymentMethod } = req.body;

        console.log(productId);

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const product = await productModel.findById(productId).populate("shop");
        if (!product) {
            return res.status(404).send("Product not found");
        }

        const newOrder = await orderModel.create({
            productId: product._id,
            address,
            paymentMethod,
            status: "Confirmed",
            shopName: product.shop.shopName,
            product: product,
            productName: product.name,
            totalAmount: product.price,
            date: new Date(),
        });

        user.orders.push(newOrder._id);
        await user.save();

        await userOrderModel.create({
            orders: [newOrder._id],
            user: user._id
        });

        res.status(201).render("order-confirmed");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// This route is show that all products and show that in that ejs file.
router.get("/userorder", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;

        const userOrders = await userOrderModel.findOne({ user: userId }).populate('orders');
        if (!userOrders) {
            return res.status(404).render('user-order', { orders: [] });
        }

        const orders = await orderModel.find({
            _id: { $in: userOrders.orders }
        }).populate({
            path: 'product',
            select: 'name productImage'
        });

        const ordersWithImages = orders.map(order => {
            const orderObj = order.toObject();

            if (orderObj.product && orderObj.product.productImage) {
                orderObj.productImageBase64 = orderObj.product.productImage.toString('base64');
                delete orderObj.product.productImage;
            } else {
                orderObj.productImageBase64 = null;
            }

            return orderObj;
        });

        res.status(200).render('user-order', { orders: ordersWithImages });
    } catch (err) {
        console.error('Error in userorder route:', err);
        res.status(500).render('error', { message: "Server error occurred" });
    }
});



module.exports = router