const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Assuming you have a Product model
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model for customers
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Credit Card', 'Debit Card', 'UPI'],  // Modify as needed
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
    totalAmount: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
