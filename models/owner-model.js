const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullName: {
        type:String,
        require:true,
        minLength:4,
        trim:true
    },
    email: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true,
        trim:true
    },
    isAdmin: Boolean,
    contact:Number,
    orders: {
        type:Array,
        default:[]
    },
    picture: {
        type:String,
    },
    gstin:String
})

const ownerModel = mongoose.model("owners",ownerSchema);

module.exports = ownerModel;