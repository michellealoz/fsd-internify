// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Assuming you have a User model

// POST route to create a new user
router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// GET route to fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

module.exports = router;
