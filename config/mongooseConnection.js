const mongoose = require("mongoose");
const debug = require("debug")('development:mongoose');
require("dotenv").config();

const connectMongodb = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || config.get("MONGODB_URI");
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        debug("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectMongodb;