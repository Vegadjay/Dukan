const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 4,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: Number,
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
