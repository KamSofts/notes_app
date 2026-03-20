const db = require('../db');

const createNote = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (user_id <= 0) {
            throw new Error("User not found");
        }
        const { note } = req.body;
        const date = new Date().toISOString().split("T")[0];
        const [rs] = await db.query(
            `INSERT INTO notes (user_id, note, date)
             VALUES (?,?,?);`, [user_id, note, date]);
        res.status(200).json({ message: "Record added" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const readNotes = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (user_id <= 0) {
            throw new Error("User not found");
        }
        const [rs] = await db.query(`SELECT note_id,note
            ,DATE_FORMAT(date,'%d-%b-%Y') AS date
             FROM notes WHERE user_id=?;`, [user_id]);
        res.status(200).json(rs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createNote, readNotes };