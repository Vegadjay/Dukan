const express = require("express");
const authController = require("../controllers/authController")
const router = express.Router();


// login and register shop owners

router.post('/register',authController.regiseterOwner)
router.post('/login',authController.loginOwner)

module.exports = router;
