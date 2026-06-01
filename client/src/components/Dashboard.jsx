import { useEffect, useState } from "react";
import "./Dashboard.css";
import api from "../utils/api";

const Dashboard = () => {

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [noteId, setNoteId] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      setNotes(response.data);
    } catch (err) {
      setError("Failed to fetch notes" + err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSumbit = async () => {
    try {
      if (noteId) {
        const response = await api.put(`/notes/${noteId}`, { note });
        setNoteId(null);
      } else {
        const response = await api.post("/notes", { note });
      }
      setNote("");
      fetchNotes();
    } catch (err) {
      setError("Failed to update notes" + err);
    }
  }

  const handleEdit = (note) => {
    setNote(note.note);
    setNoteId(note.note_id);
  }

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure to delete?")) {
        await api.delete(`/notes/${id}`);
        fetchNotes();
      }
    } catch (err) {
      setError("Failed to delete notes" + err);
    }
  }

  return (
    <div className="dashboard-container">
      <h2>Note List</h2>
      <p className="error">{error}</p>

      <div className="input-group">
        <textarea placeholder="Write a note..." value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="create-btn" onClick={handleSumbit}>
          {noteId ? "Update Note" : "Create Note"}
        </button>
      </div>

      <div className="notes-list">
        {notes.length > 0 &&
          notes.map((note) => (
            <div className="note-card" key={note.note_id}>
              <div className="note-content">
                <p className="note-text">{note.note}</p>
                <p className="note-date">{note.date}</p>
              </div>
              <div className="actions">
                <button className="edit-btn" onClick={() => handleEdit(note)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(note.note_id)} >Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
