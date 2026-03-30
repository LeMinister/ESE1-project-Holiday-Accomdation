import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { isLoggedIn, logout } from "../auth";

function Header() {
  const nav = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        🏡 Holiday Accommodations
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>

        {!loggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {loggedIn && (
          <>
            <Link to="/bookings">My Bookings</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;