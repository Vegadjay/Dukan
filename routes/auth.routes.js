const express = require("express");
const ownerController = require("../controllers/ownerAuth")
const userController = require("../controllers/userAuth")

const router = express.Router();

router.post("/owner/register",ownerController.registerOwner)
router.post("/owner/login",ownerController.loginOwner)
router.post("/users/register",userController.createUser)
router.post("/users/login",userController.loginExistUser)

// todo: here this is not valid like and this is not calling well known
module.exports = router;