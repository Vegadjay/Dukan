const mongoose = require('mongoose');
const productModel = require('./product-model'); // Import the product model

const shopSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
        trim: true
    },
    ownerNo: {
        type: Number,
        required: true,
    },
    ownerEmail: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    shopAddress: {
        type: String,
        required: true,
        trim: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
