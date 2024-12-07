const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersAuth");
const ownerController = require("../controllers/ownerAuth");

router.post("/users/register", userController.registerUser1);
router.post("/users/login", userController.loginUser1);
router.post('/owner/register',ownerController.loginOwner)
router.post('/owner/login',ownerController.regiseterOwner)

module.exports = router;