const User = require('../models/User');

// Create
exports.post = async (req, res) => {
    console.log("POST: /users");

    const { id, name, email, phone, password, card, address, orders, cart } = req.body;

    const user = {
        id,
        name,
        email,
        phone,
        password,
        card,
        address,
        orders,
        cart
    };

    if (!id) {
        res.status(422).json({ error: 'Invalid id' });
        return;
    }

    try {
        await User.create(user);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// Read
exports.get = async (req, res) => {
    console.log("GET: /users");
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    console.log(`GET: /users/${id}`);

    try {
        const user = await User.findOne({ id: id });

        if (!user) {
            res.status(422).json(null);
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// Update
exports.put = async (req, res) => {
    const pid = req.params.id;
    console.log(`PUT: /users/${pid}`);

    const { id, name, email, phone, password, card, address, orders, cart } = req.body;

    const user = {
        id,
        name,
        email,
        phone,
        password,
        card,
        address,
        orders,
        cart
    };

    try {
        const updatedUser = await User.updateOne({ id: pid }, user);

        if (updatedUser.matchedCount === 0) {
            res.status(422).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// Delete
exports.delete = async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ id: id });

    if (!user) {
        res.status(422).json({ message: 'User not found' });
        return;
    }

    try {
        await User.deleteOne({ id: id });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}