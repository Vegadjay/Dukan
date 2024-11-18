const mongoose = require("mongoose");
require("dotenv").config();

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_STRING)} catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

module.exports = connectDb;
