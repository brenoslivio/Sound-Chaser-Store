const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for user
const schema = new Schema({
    id : {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    card: {
        number: String,
        holder: String, 
        expiration: String, 
        security: String
    },
    address: {
        address: String, 
        receiver: String
    },
    orders: [{
        number: Number, 
        date: String, 
        status: String, 
        total: Number
    }],
    cart: [{
        id: Number, 
        quantity: Number
    }]
})

module.exports = mongoose.model('User', schema);