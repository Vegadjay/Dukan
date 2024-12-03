const express = require("express");
const router = express.Router();

router.get("/admin",(req,res)=> {
    res.render("admin-login");
})

router.get("/owner",(req,res)=> {
    res.render("owner-login");
})


module.exports = router;