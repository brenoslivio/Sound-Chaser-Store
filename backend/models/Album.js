const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for album
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
    artist : {
        type: String,
        required: true,
    },
    year : {
        type: Number,
        required: true,
    },
    genre : {
        type: String,
        required: true,
    },
    img : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    stock : {
        type: Number,
        required: true,
    },
    sold : {
        type: Number,
        required: true,
    },
    date_added : {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Album', schema);