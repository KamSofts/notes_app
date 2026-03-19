require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');
// user imports
// const db = require('./db'); // Verify database connection
const authRoutes = require('./routes/authRoutes');

// lauch app
const app = express();

// middlewares
app.use(express.json());
app.use("uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// Add this after your routes
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});
