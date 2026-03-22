import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import { useState } from "react";
import api from "../utils/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [profile_image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("password", password);
    if (profile_image) {
      formData.append("profile_image", profile_image);
    }

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h4 className="form-title">Register</h4>
        <p className="error">{error}</p>
        <div className="form-group">
          <input type="text" placeholder="Username" className="form-input"
            value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" className="form-input"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="contact" placeholder="Contact" className="form-input"
            value={contact} onChange={(e) => setContact(e.target.value)} />
          <input type="password" placeholder="Password" className="form-input"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="file" accept="image/*" className="form-input"
            onChange={(e) => setImage(e.target.files[0])} />
          <button className="form-button" onClick={handleSumbit}>Register</button>
          <p>
            Already have an account ? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;