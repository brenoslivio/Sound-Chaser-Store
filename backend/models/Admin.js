const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for admin
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
    }
})

module.exports = mongoose.model('Admin', schema);