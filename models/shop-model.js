const productModel = require("../models/product-model");

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    products: [productModel],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model('Shop', shopSchema);

module.exports = model;
