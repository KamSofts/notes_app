const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username or email and password required" });
        }

        const [rs] = await db.query("SELECT * FROM users WHERE username=? OR email=?;", [username, username]);
        if (rs.length <= 0) {
            return res.status(400).json({ message: "Invalid user" });
        }

        const user = rs[0];
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: process.env.JWT_VALIDITY });
        res.cookie("token", token,
            {
                expiresIn: new Date(Date.now() + process.env.COOKIE_VALIDITY * 24 * 60 * 60 * 1000),
                httpOnly: true
            });

        res.status(200).json({ message: "Login success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };