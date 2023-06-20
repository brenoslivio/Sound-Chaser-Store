// Configuration
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    res.setHeader("Content-Type", "application/json");
    next();
});  

// Read JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// API routes
const albumRoutes = require('./routes/albumRoutes');

app.use('/albums', albumRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Hello'})
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

// Load JSON data
const jsonData = fs.readFileSync('db.json', 'utf8');
const data = JSON.parse(jsonData);

// DB Connection
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.jnvshqr.mongodb.net/apidb?retryWrites=true&w=majority`
    )
    .then(async () => {
        // Drop database
        console.log("Successfully connected to MongoDB");
        await mongoose.connection.db.dropDatabase();

        const Model = mongoose.model('Album');
        Model.insertMany(data.albums)
            .then(() => {
                console.log('Data loaded successfully!');
            })
            .catch((error) => {
                console.error('Error loading data:', error);
            });

        app.listen(8000)
    })
    .catch((err) => console.log(err));

