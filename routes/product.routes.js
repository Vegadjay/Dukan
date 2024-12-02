const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig")
const productModel = require("../models/product-model")

router.post("/create", upload.single("image") , async (req,res)=>{

    const { name,discount,price,bgcolor,panelColor,textColor } = req.body;

    try {
        const product = await productModel.create({
        name,
        discount,
        price,
        bgcolor,
        panelColor,
        textColor,
        image:req.file.buffer,
    })

    req.flash("success","Product Created Succrssfully..")
    res.redirect("/owners/admin");
} catch (err) {
        req.flash("error","Something Went Wrong");
    }
})


module.exports = router