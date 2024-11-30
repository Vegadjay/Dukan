const express = require("express");
const router = express.Router();
const ownerModel = require('../models/owner-model');

router.get("/",(req,res)=>{
    res.send("Hey From Owner Route");
})


if(process.env.NODE_ENV === "development") {
    router.post('/create', async (req,res)=> {
        const owners = await ownerModel.find();
        if(owners.length > 0 ) {
           return res.status(503).send("No, More owner available.... ")
        }
        
        const { fullName, email, password  } = req.body;

        const createdOwner = await ownerModel.create({
                    fullName,
                    email,
                    password,
        })

        res.send(createdOwner);
    })
}



module.exports = router