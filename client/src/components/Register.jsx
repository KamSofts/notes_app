import { Link } from "react-router-dom";
import "./Style.css";

const Register = () => {
  return (
    <div className="form-container">
      <div className="form-card">
        <h4 className="form-title">Register</h4>
        <p className="error"></p>
        <div className="form-group">
          <input type="text" placeholder="Username" className="form-input" />
          <input type="email" placeholder="Email" className="form-input" />
          <input type="contact" placeholder="Contact" className="form-input" />
          <input type="password" placeholder="Password" className="form-input" />
          <input type="file" accept="image/*" className="form-input"/>
          <button className="form-button">Register</button>
          <p>
            Already have an account ? <Link to="/login">Sign in</Link>
          </p>          
        </div>
      </div>
    </div>
  );
}

export default Register;