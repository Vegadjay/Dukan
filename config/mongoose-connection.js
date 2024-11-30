const mongoose = require("mongoose");
const config = require('config');
const debug = require("debug")('development:mongoose');
require("dotenv").config();

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(()=>debug("DB is connected"))
.catch((err)=>console.log("Db is not connected",err))

module.exports = mongoose.connection