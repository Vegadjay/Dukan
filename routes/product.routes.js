const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig")
const productModel = require("../models/product-model")
const shopModel = require("../models/shop-model");
const authenticateUser = require('../middlewares/authUser');

// This file contain pages of product and also contains that api for working like we edit product and also we can delete product. 

// use for show that create page
router.get('/createproduct', (req, res) => {
    res.render("add-product");
})

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

// api for edit product
router.post('/edit/:id', async (req, res) => {
    try {
        // The method is overridden to PUT
        console.log(req.method)
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

    console.log(productId)
    res.render('confirm-delete', { productId })
})

// api that delete product
router.post('/deleteproduct/:productId', async (req, res) => {
    try {
        if (req.body._method === "DELETE") {
            const { productId } = req.params;
            const { confirmCheck } = req.body;

            if (!confirmCheck) {
                return res.status(400).json({ message: 'You must confirm deletion.' });
            }
            const product = await productModel.findByIdAndDelete(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }

            console.log('Deleted product:', product);

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

    console.log("product id: ", productId)

    res.render("product-details")
})

router.get("/payment", async (req, res) => {
    try {
        // const product = await productModel.findById(req.params.id);
        // if (!product) {
        //     return res.status(404).send("Product not found.");
        // }
        res.render("confirm-payment");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router