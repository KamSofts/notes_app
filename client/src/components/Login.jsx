import { Link } from "react-router-dom";
import "./Style.css";

const Login = () => {
  return (
    <div className="form-container">
      <div className="form-card">
        <h4 className="form-title">Login</h4>
        <p className="error"></p>
        <div className="form-group">
          <input type="text" placeholder="Username or Email" className="form-input" />
          <input type="password" placeholder="Password" className="form-input" />
          <button className="form-button">Login</button>
          <p>
            Don't have an account ? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;