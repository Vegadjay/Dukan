const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");

// Admin form for register 
router.get("/admin",(req,res)=> {
    res.render("admin-register")
})


// Owner foam for register
router.get("/owner",(req,res)=> {
    res.render("owner-register")
})

// Api for register admin
router.post("/admin/user",userController.loginAdmin);

// todo: complete this route
// router.post("/logout",userController.logoutUser);


module.exports = router;

module.exports = router;