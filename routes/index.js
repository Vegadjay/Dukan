const express = require("express");
const isLoggedin = require('../middlewares/isLoggedin')
const router = express.Router();

const products = [
    {
        name: "Product 1",
        price: 500,
        bgcolor: "lightblue",
        panelcolor: "white",
        textcolor: "black",
        image: Buffer.from("sample-base64-image-data", "base64"), 
    },
    {
        name: "Product 2",
        price: 1000,
        bgcolor: "lightgreen",
        panelcolor: "white",
        textcolor: "black",
        image: Buffer.from("sample-base64-image-data", "base64"),
    },
];

router.get("/",(req,res)=>{ 
    let error = req.flash("error");
    res.render("index", {error})
})

router.get("/shop", isLoggedin, (req,res) => {
    res.render("shop", {products});
})



module.exports = router;