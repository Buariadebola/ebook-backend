const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({message: 'Username or Email already exists' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Signup Error:", error); 
        res.status(500).json({ message: 'Error creating user' });
    }
});

module.exports = router;