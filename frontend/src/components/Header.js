import React from 'react';
import './Header.css';

function Header({ onNavigate }) {
  return (
    <header className="header">
      <h1 className="logo">Holiday Booking</h1>
      <nav>
        <button onClick={() => onNavigate('register')}>Register</button>
        <span> | </span>
        <button onClick={() => onNavigate('login')}>Login</button>
        <span> | </span>
        <button onClick={() => onNavigate('manageBooking')}>Manage Booking</button>
      </nav>
    </header>
  );
}

export default Header;