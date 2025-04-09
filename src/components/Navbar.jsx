import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleChatbot }) => {
  return (
    <nav className="navbar">
      <div className="logo">🎬 Akky.ai</div>
      <ul className="nav-links">
        <li><Link to="/">Current Movies</Link></li>
        <li><Link to="/nearby-cinemas">Nearby Cinemas</Link></li>
        <li><Link to="/coming-soon">Coming Soon</Link></li>
        <li><Link to="/booking-history">Booking History</Link></li>
        <li onClick={toggleChatbot} style={{ cursor: 'pointer' }}>ChatBot</li>
      </ul>
    </nav>
  );
};

export default Navbar;
