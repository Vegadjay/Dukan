const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    price: {
        type:Number,
        require:true
    },
    image: {
        type:Buffer
    },
    name:{
        type:String
    },
    discount: {
        type:String,
        default:0
    },
    bgcolor:{
        type:String,
    },
    panelColor: {
        type:String
    },
    textColor: {
        type:String
    }
})

const productModel = mongoose.model("product",productSchema);

module.exports =  productModel;