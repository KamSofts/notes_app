const express = require('express');
const auth = require('../middleware/auth');
const { createNote } = require('../controllers/noteController');

const router = express.Router();

router.post("/", auth, createNote);

module.exports = router;