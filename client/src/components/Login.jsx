import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login({ username, password });
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Login failed: Invalid response from server");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }

  };

  if (loading) {
    return <div>Loading...</div>
  }



  return (
    <div className="form-container">
      <div className="form-card">
        <h4 className="form-title">Login</h4>
        <p className="error">{error}</p>
        <div className="form-group">
          <input type="text" placeholder="Username or Email" className="form-input"
            value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="form-input"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="form-button" onClick={handleSumbit}>Login</button>
          <p>
            Don't have an account ? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;