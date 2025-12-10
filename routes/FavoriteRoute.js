const express = require('express');
const router = express.Router();
const authenticate = require('../AuthMiddleware');
const Favorite = require('../models/FavoriteModel');

router.post('/add', authenticate, async (req, res) => {
     const { bookId, title, author, img, price, genre } = req.body;
    try {
        let fav = await Favorite.findOne({ user: req.user.userId});
        if (!fav) {
            fav = new Favorite({ user: req.user.userId, items: [] });
        }

        const exists = fav.items.some(item => item.bookId === bookId);
        if (!exists) {
            fav.items.push({ bookId, title, author, img, price, genre });
        }

        await fav.save();
        res.json(fav);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding to favorites'});
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
        const fav = await Favorite.findOne({ user: req.user.userId });
        res.json(fav || { items: [] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching favorites' });
    }
});

router.post('/remove', authenticate, async (req, res) => {
    try {
        const { bookId } = req.body;

        const fav = await Favorite.findOne({ user: req.user.userId });
        if (!fav) return res.status(404).json({ message: "Favorites not found" });

        fav.items = fav.items.filter(item => item.bookId !== bookId);

        await fav.save();
        return res.json(fav);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing favorite" });
    }
});


module.exports = router;