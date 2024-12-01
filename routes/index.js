const express = require("express");
const isLoggedin = require('../middlewares/isLoggedin')
const router = express.Router();

router.get("/",(req,res)=>{ 
    res.render("index", {error: ''})
})

router.get("/shop", isLoggedin, (req,res) => {
    res.render("shop");
})

module.exports = router;