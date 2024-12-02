const express = require("express");
const userController = require('../controllers/authController')
const router = express.Router();

router.post("/register",userController.regiseterUser)
router.post("/login",userController.loginUser);

// todo: complete this route
// router.post("/logout",userController.logoutUser);


module.exports = router;