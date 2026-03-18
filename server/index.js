require('dotenv').config();
const express = require('express');
// user imports
// const db = require('./db'); // Verify database connection
const authRoutes = require('./routes/authRoutes');

// lauch app
const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});