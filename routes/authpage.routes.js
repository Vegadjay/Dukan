const express = require("express")
const router = express.Router();

// add admin login page
router.get("/users/loginpage",(req,res)=> {
    res.render("admin-login");
})

// add admin register page
router.get("/users/registerpage",(req,res)=> {
    res.render("admin-register")
})

router.get("/owner/loginpage",(req,res)=> {
    res.render("owner-login")
})

router.get("/owner/registerpage",(req,res)=> {
    res.render("owner-register")
})

module.exports = router