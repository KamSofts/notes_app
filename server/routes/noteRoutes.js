const express = require('express');
const auth = require('../middleware/auth');
const { createNote, readNotes } = require('../controllers/noteController');

const router = express.Router();

router.post("/", auth, createNote);
router.get("/", auth, readNotes);

module.exports = router;