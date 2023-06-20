const mongoose = require('mongoose');

const Admin = mongoose.model('Admin', {
    id: Number,
    name: String,
    email: String,
    phone: String,
    password: String
});

module.exports = Admin;