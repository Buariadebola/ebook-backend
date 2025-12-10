require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require('./routes/AuthRoute');
const signinRoute = require('./routes/SigninRoute');
const protectedRoute = require('./routes/ProtectedRoute');
const favoriteRoute = require('./routes/FavoriteRoute');
const profileRoutes = require("./routes/profileRoutes");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: "10mb" })); // allows base64 image
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', authRoute);
app.use('/api', signinRoute);
app.use('/api', protectedRoute);
app.use('/api/favorites', favoriteRoute);
app.use("/api", profileRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server running on " + PORT));
