const express = require('express');
const { register, login } = require('../controllers/authController');
const upload = require('../middleware/fileupload');

const router = express.Router();

router.post("/register", upload.single("profile_image"), register);
router.post("/login", login);

module.exports = router;