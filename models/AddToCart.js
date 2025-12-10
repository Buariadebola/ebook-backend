const express = require('express');
const app = express();

app.post('/api/cart', authenticateUser, (req, res) => {
    const userId = req.user.id;
    const product = req.body.product;

    Cart.findByIdAndUpdate(userId, { $push: { products: product } }, { new: true }, (err, cart) => {
        if (err) {
            res.status(500).send({ message: 'Error updating cart'});
        } else {
            res.send(cart);
        }
    });
});