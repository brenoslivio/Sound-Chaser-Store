const mongoose = require('mongoose');

const User = mongoose.model('User', {
    id: Number,
    name: String,
    email: String,
    phone: String,
    password: String,
    card: {number: String, holder: String, expiration: String, security: String},
    address: {address: String, receiver: String},
    orders: [{number: Number, date: String, status: String, total: Number}],
    cart: [{id: Number, quantity: Number}]
});

module.exports = User;