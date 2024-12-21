const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'Credit Card', 'Debit Card', 'UPI'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
        default: 'Pending',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    shopName: {
        type: String,
        require: true
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
