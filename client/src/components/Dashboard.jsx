import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Note List</h2>
      <p className="error"></p>
      
      <div className="input-group">
        <textarea placeholder="Write a note..."></textarea>
        <button className="create-btn">Create Note</button>
      </div>

      <div className="notes-list">
        <div className="note-card">
          <div className="note-content">
            <p>Testing notes one</p>
            <p className="note-date">21-03-2026</p>
          </div>
          <div className="actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>

        <div className="note-card">
          <div className="note-content">
            <p>Testing notes two</p>
            <p className="note-date">21-03-2026</p>
          </div>
          <div className="actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>

        <div className="note-card">
          <div className="note-content">
            <p>Testing notes three asdfasdf asdfasdfasdf asdfasdf</p>
            <p className="note-date">21-03-2026</p>
          </div>
          <div className="actions">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
