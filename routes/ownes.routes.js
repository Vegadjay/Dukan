const express = require('express');
const router = express.Router();
const productModel = require("../models/product-model")

// (/owners)

router.get('/products', async (req,res)=>{
    const products = await productModel.find();
    res.render("showproducts",{products});
})

router.get('/addproduct', async (req,res)=>{
    res.render("addproduct");
})


module.exports = router