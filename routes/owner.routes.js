const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const ownerModel = require('../models/owner-model');

router.get("/", (req, res) => {
    res.send("Hey From Owner Route");
});

if (process.env.NODE_ENV === "development") {
    router.post('/create', async (req, res) => {
        const owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(503).send("No, More owner available.... ");
        }

        const { fullName, email, password } = req.body;

        try {
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_COUNT));
            const hash = await bcrypt.hash(password, salt);

            const createdOwner = await ownerModel.create({
                fullName,
                email,
                password: hash
            });

            res.send(createdOwner);
        } catch (err) {
            res.status(500).send("Server Error.. ");
        }
    });
}

router.get("/admin",(req,res)=> {
    res.render("admin")
})

router.get("/admin/createproducts",(req,res)=> {
    let success = req.flash("success")
    res.render("createproducts", {success});
})  


module.exports = router;
