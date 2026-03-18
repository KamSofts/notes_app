require('dotenv').config();
const express = require('express');
// const db = require('./db'); // Verify database connection

// lauch app
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});