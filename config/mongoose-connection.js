const mongoose = require("mongoose");
const debug = require("debug")('development:mongoose')
require("dotenv").config();

mongoose.connect(process.env.MONGO_STRING)
.then(()=>debug("DB is connected"))
.catch((err)=>console.log("Db is not connected",err))

module.exports = mongoose.connection