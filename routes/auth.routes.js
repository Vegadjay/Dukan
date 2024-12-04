const express = require("express");
const ownerController = require("../controllers/ownerAuth")
const userController = require("../controllers/usersAuth")

const router = express.Router();

// this all apis register and login for all user like owner and actual customer


// todo: this is all apis that is end points for login and register new users that is not for frontend so we can not touch this


router.post("/owner/register",ownerController.registerOwner)
router.post("/owner/login",ownerController.loginShopOwner1)
router.post("/users/register",userController.registerUser1)
router.post("/users/login",userController.loginUser1)


module.exports = router;