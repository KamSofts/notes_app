const express = require('express');
const { register } = require('../controllers/authController');
const upload = require('../middleware/fileupload');

const router = express.Router();

router.post("/register", upload.single("profile_image"), register);

module.exports = router;