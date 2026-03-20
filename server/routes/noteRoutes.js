const express = require('express');
const auth = require('../middleware/auth');
const { createNote, readNotes, updateNotes, deleteNote } = require('../controllers/noteController');

const router = express.Router();

router.post("/", auth, createNote);
router.get("/", auth, readNotes);
router.put("/:id", auth, updateNotes);
router.delete("/:id", auth, deleteNote);

module.exports = router;