// src/components/NavBar.js
import React from 'react';
import './NavBar.css'; // Optional: For styling

const NavBar = ({ setActiveView }) => {
  return (
    <nav className="navbar">
      <button onClick={() => setActiveView('form')}>Form</button>
      <button onClick={() => setActiveView('table')}>Table</button>
      <button onClick={() => setActiveView('blog')}>Blog</button>
    </nav>
  );
};

export default NavBar;
