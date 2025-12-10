const express = require('express');
const router = express.Router();
const authenticate = require('../AuthMiddleware');

router.get('/protected', authenticate, (req,res) => {
    res.json({ message: 'Hello, authenticated user!', user: req.user });
});

module.exports = router;