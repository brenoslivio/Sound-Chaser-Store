const mongoose = require('mongoose');

const Album = mongoose.model('Album', {
    id: Number,
    name: String,
    artist: String,
    year: Number,
    genre: String,
    img: String,
    description: String,
    price: Number,
    stock: Number,
    sold: Number,
    date_added: String
});

module.exports = Album;