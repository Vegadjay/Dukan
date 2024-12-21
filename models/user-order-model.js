const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    orders: {
        type: Array,
        default: []
    },
    
});
module.exports = mongoose.model('Orders', ordersSchema);