const express = require("express");
const isLoggedin = require('../middlewares/isLoggedin')
const router = express.Router();
const productModel = require("../models/product-model");

router.get("/",(req,res)=>{ 
    res.render("login")
})

router.get("/shop", isLoggedin, async (req,res) => {
    let products = await productModel.find();
    res.render("shop", {products});
})

router.get("/error",(req,res)=> {
    res.render("errorPage")
})

module.exports = router;