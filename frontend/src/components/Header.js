import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        🏡 Holiday Accommodations
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/bookings">My Bookings</Link>
      </nav>
    </header>
  );
}

export default Header;