const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    shopAddress: {
        type: String,
        required: true,
        trim: true
    },
    shops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }],
    contact: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ownerModel = mongoose.model("Owner", ownerSchema);

module.exports = ownerModel;