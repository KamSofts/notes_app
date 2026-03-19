const express = require('express');
const { register, login, getCurrentUser, logout } = require('../controllers/authController');
const upload = require('../middleware/fileupload');
const auth = require('../middleware/auth');

const router = express.Router();

router.post("/register", upload.single("profile_image"), register);
router.post("/login", login);
router.get("/me", auth, getCurrentUser);
router.get("/logout", logout);

module.exports = router;