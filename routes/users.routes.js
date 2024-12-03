const express = require("express");
const userController = require('../controllers/authController')
const router = express.Router();


// register and login shop owner 
router.post("/register",userController.regiseterOwner)
router.post("/login",userController.loginOwner);

    
module.exports = router;