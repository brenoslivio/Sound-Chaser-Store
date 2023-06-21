const router = require('express').Router();

const Album = require('../models/Album');

// Create
router.post('/', async (req, res) => {
    console.log("POST: /albums");

    const {id, name, artist, year, genre, img, description, price, stock, sold, date_added} = req.body;

    const albums = {
        id, 
        name, 
        artist, 
        year, 
        genre, 
        img, 
        description, 
        price, 
        stock, 
        sold, 
        date_added
    };

    if (!id) {
        res.status(422).json({ error: 'Invalid id' });
    }

    try {
        await Album.create(albums);

        res.status(201).json({ message: 'Albums created successfully' });
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

// Read
router.get('/', async (req, res) => {
    console.log("GET: /albums");
    try {
        const albums = await Album.find()
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`GET: /albums/${id}`);

    try {
        const album = await Album.findOne({ id: id });

        if (!album) {
            res.status(422).json(null);
            return;
        }

        res.status(200).json(album);
    } catch (error) {
        res.stauts(500).json({ error: error })
    }
});

// Update

// All albums
router.put('/', async (req, res) => {
    console.log('PUT: /albums');

    const albumsToUpdate = req.body; // Array of album objects to update

    try {
        for (const album of albumsToUpdate) {
            const { id, name, artist, year, genre, img, description, price, stock, sold, date_added } = album;
    
            const updatedAlbum = {
            name,
            artist,
            year,
            genre,
            img,
            description,
            price,
            stock,
            sold,
            date_added
            };
    
            await Album.updateOne({ id: id }, updatedAlbum);
        }

        res.status(200).json({ message: 'Albums updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// By Id
router.put('/:id', async (req, res) => {
    const pid = req.params.id;
    console.log(`PUT: /albums/${id}`);

    const { id, name, artist, year, genre, img, description, price, stock, sold, date_added } = req.body;

    const album = {
        id, 
        name, 
        artist, 
        year, 
        genre, 
        img, 
        description, 
        price, 
        stock, 
        sold, 
        date_added
    };

    try {
        const updatedAlbum = await Album.updateOne({ id: pid }, album);

        if (updatedAlbum.matchedCount === 0) {
            res.status(422).json({ message: 'Album not found' });
            return;
        }

        res.status(200).json({ message: 'Album updated successfully' });
    } catch (error) {
        res.stauts(500).json({ error: error })
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const album = await Album.findOne({ id: id });

    if (!album) {
        res.status(422).json({ message: 'Album not found' });
        return;
    }

    try {
        await Album.deleteOne({ id: id });
        
        res.status(200).json({ message: 'Album deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;