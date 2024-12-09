const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true,
        minLength: 4,
        trim: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    cart: {
        type: Array,
        default: []
    },
    contact: Number,
    orders: {
        type: Array,
        default: []
    }
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;