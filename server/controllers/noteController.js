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

const updateNotes = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (user_id <= 0) {
            throw new Error("User not found");
        }
        const note_id = req.params.id;
        if (note_id <= 0) {
            throw new Error("Note not found");
        }
        const { note } = req.body;
        const sql = "UPDATE notes SET note=? WHERE user_id=? AND note_id=?;";
        const [rs] = await db.query(sql, [note, user_id, note_id]);
        if (rs.affectedRows > 0) {
            res.status(200).json({ message: "Record updated" });
        } else {
            res.status(404).json({ message: "Record not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (user_id <= 0) {
            throw new Error("User not found");
        }
        const note_id = req.params.id;
        if (note_id <= 0) {
            throw new Error("Note not found");
        }
        const sql = "DELETE FROM notes WHERE user_id=? AND note_id=?;";
        const [rs] = await db.query(sql, [user_id, note_id]);
        if (rs.affectedRows > 0) {
            res.status(200).json({ message: "Record deleted" });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createNote, readNotes, updateNotes, deleteNote };