const router = require('express').Router();
const fs = require('fs');
const Album = require('../models/Album');

// Create
router.post('/', async (req, res) => {
    console.log("POST: /albums");

    const {id, name, artist, year, genre, img, description, price, stock, sold, date_added} = req.body;

    const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const filePath = `../frontend/public/imgs/albums/${name.toLowerCase().replace(/\s/g, '_')}_${id}.png`;

    fs.writeFile(filePath, buffer, (error) => {
        if (error) {
          console.error('Error creating image file:', error);
          // Handle the error
          return;
        }
        console.log('Image file created successfully');
    });

    const img_file = filePath.split("public")[1];

    const album = {
        id, 
        name, 
        artist, 
        year, 
        genre, 
        img: img_file, 
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
        await Album.create(album);

        res.status(201).json({ img_file });
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
    console.log(`PUT: /albums/${pid}`);

    const { id, name, artist, year, genre, img, description, price, stock, sold, date_added } = req.body;

    let img_file;

    if (img.includes("/imgs/albums")) {
        const parts = url.split("/");  // Split the URL by slashes
        img_file = `/imgs/albums/${parts.pop()}`; 
    } else {
        const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
    
        const filePath = `../frontend/public/imgs/albums/${name.toLowerCase().replace(/\s/g, '_')}_${id}.png`;
    
        fs.writeFile(filePath, buffer, (error) => {
            if (error) {
              console.error('Error creating image file:', error);
              // Handle the error
              return;
            }
            console.log('Image file created successfully');
        });
    
        img_file = filePath.split("public")[1];
    }

    const album = {
        id, 
        name, 
        artist, 
        year, 
        genre, 
        img: img_file, 
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

        res.status(200).json({ img_file });
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