const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: [
        {
            bookId: { type: String, required: true },
            title: String,
            author: String,
            img: String,
            price: String,
            genre: String
        },
    ],
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;