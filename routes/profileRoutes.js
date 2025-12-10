const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();
const authenticate = require("./AuthMiddleware"); // JWT middleware

// GET PROFILE
router.get("/profile", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            username: user.username,
            email: user.email,
            image: user.image
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
});

// UPDATE PROFILE
router.put("/profile", authenticate, async (req, res) => {
    try {
        const { username, email, image } = req.body;

        const updated = await User.findByIdAndUpdate(
            req.user.userId,
            { username, email, image },
            { new: true }
        );

        res.json({
            username: updated.username,
            email: updated.email,
            image: updated.image
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
});

module.exports = router;
