const express = require("express");
const isLoggedin = require('../middlewares/isLoggedin')
const router = express.Router();
const productModel = require("../models/product-model");

router.get("/",(req,res)=>{ 
    let error = req.flash("error");
    res.render("login", {error})
})

router.get("/shop", isLoggedin, async (req,res) => {
    let products = await productModel.find();
    res.render("shop", {products});
})



module.exports = router;