const express = require("express");
const router = express.Router();

router.get("/users/loginpage", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin-login", { successMessage, errorMessage });
});

router.get("/users/registerpage", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("admin-register", { successMessage, errorMessage });
});

router.get("/owner/loginpage", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("owner-login", { successMessage, errorMessage });
});

router.get("/owner/registerpage", (req, res) => {
    const successMessage = req.flash("success");
    const errorMessage = req.flash("error");
    res.render("owner-register", { successMessage, errorMessage });
});



module.exports = router;
