const mongoose = require("mongoose");
const config = require('config');
const debug = require("debug")('development:mongoose');
require("dotenv").config();


const connectMongodb = async () => {
    try {
        await mongoose.connect(`${config.get("MONGODB_URI")}/scatch`).then(()=>{
        console.log("Connection is confirmed... ")
    })
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectMongodb;