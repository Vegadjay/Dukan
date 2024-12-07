const express = require("express");
const router = express.Router();

// Add admin login page
router.get("/users/loginpage", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin-login", { successMessage, errorMessage });
});

// Add admin register page
router.get("/users/registerpage", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin-register", { successMessage, errorMessage });
});

// Add owner login page
router.get("/owner/loginpage", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("owner-login", { successMessage, errorMessage });
});

// Add owner register page
router.get("/owner/registerpage", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("owner-register", { successMessage, errorMessage });
});

module.exports = router;
