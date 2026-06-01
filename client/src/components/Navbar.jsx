import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const Navbar = () => {

  const { user } = useContext(AuthContext);

  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Notes</Link>
        </div>
        <div className="nav-links">
          {user
            ? (<>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">{user.username.toUpperCase() + " PROFILE"}</Link>
            </>)
            : (<>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>)
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;