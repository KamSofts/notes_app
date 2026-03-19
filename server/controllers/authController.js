const bcrypt = require('bcryptjs');
const db = require('../db');

const register = async (req, res) => {
    try {
        const { username, email, password, contact } = req.body;
        const profile_image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email and password required" });
        }

        const [rs] = await db.query("SELECT id FROM users WHERE username=? OR email=?;", [username, email]);
        if (rs.length > 0) {
            return res.status(400).json({ message: "Already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users
            (username,email,password,contact,profile_image)
            VALUES (?,?,?,?,?);`;
        await db.query(sql, [username, email, hashPassword, contact || "", profile_image]);
        res.status(201).json({ message: "Register success" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = { register };