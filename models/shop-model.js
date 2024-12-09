const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
        trim: true
    },
    ownerNo: {
        type: Number,
        require: true,
    },
    ownerEmail: {
        type: String,
        require: true
    },
    shopName: {
        type: String,
        require: true
    },
    shopAddress: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model('Shop', shopSchema);

module.exports = model;
