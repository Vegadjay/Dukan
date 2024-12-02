const express = require("express");
const router = express.Router();

router.get("/admin",(req,res)=> {
    res.render("admin-register")
})

router.get("/owner",(req,res)=> {
    res.render("owner-register")
})



module.exports = router;