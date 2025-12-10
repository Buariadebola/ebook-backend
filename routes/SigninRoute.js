const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ 
            $or: [{ username }, { email: username }] 
        });
        if (!user) {
            return res.status(401).json({message: 'invalid username or password'});
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({message: 'invalid username or password'});
        }
        const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });
        res.json({
            token,
            userId: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({message: 'Error logging in'});
    }
});

module.exports = router;