import "./header.css";
import { NavLink } from "react-router-dom";

function Header({ loggedIn, username, roles, handleLogout }) {
  return (
    <header className="header">
      <div className="top-header">
        <h1>Trips</h1>

        {loggedIn ? (
          <div className="user-info">
            <span>Logged in as: <strong>{username}</strong></span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        )}
      </div>

      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/trips">Trips</NavLink>
          </li>

          {roles?.toLowerCase().includes("admin")  && (
            <li>
              <NavLink to="/guides">Guides</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
