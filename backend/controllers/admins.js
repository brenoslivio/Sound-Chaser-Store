const Admin = require('../models/Admin');

// Create
exports.post = async (req, res) => {
    console.log("POST: /admins");

    const { id, name, email, phone, password } = req.body;

    const admin = {
        id,
        name,
        email,
        phone,
        password
    };

    // proper id is required
    if (!id) {
        res.status(422).json({ error: 'Invalid id' });
        return;
    }

    try {
        await Admin.create(admin);

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// Read
exports.get = async (req, res) => {
    console.log("GET: /admins");
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    console.log(`GET: /admins/${id}`);

    try {
        const admin = await Admin.findOne({ id: id });

        // if we don't have an admin with that id
        if (!admin) {
            res.status(422).json({ message: 'Admin not found' });
            return;
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// Update
exports.put = async (req, res) => {
    const pid = req.params.id;
    console.log(`PUT: /admins/${pid}`);

    const { id, name, email, phone, password } = req.body;

    const admin = {
        id,
        name,
        email,
        phone,
        password
    };

    try {
        const updatedAdmin = await Admin.updateOne({ id: pid }, admin);
        
        // if we don't have an admin with that id
        if (updatedAdmin.matchedCount === 0) {
            res.status(422).json({ message: 'Admin not found' });
            return;
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// Delete
exports.delete = async (req, res) => {
    const id = req.params.id;
    console.log('DELETE: /admins/id');

    const admin = await Admin.findOne({ id: id });

    // if we don't have an admin with that id
    if (!admin) {
        res.status(422).json({ message: 'Admin not found' });
        return;
    }

    try {
        await Admin.deleteOne({ id: id });

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}