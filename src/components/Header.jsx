// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';


function Header() {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <header className="header">
      <div className="logo"></div>
      <button className="menu-btn" onClick={toggleNav}>
        {/* أيقونة الهامبرغر */}
        <svg width="30" height="30" viewBox="0 0 100 80" fill="#00b4db">
          <rect width="100" height="15"></rect>
          <rect y="30" width="100" height="15"></rect>
          <rect y="60" width="100" height="15"></rect>
        </svg>
      </button>
      <nav className={`nav ${navVisible ? "active" : ""}`}>
        <Link className="a" to="/">Logo</Link>
        <Link className="a" to="/">Home</Link>
        <Link className="a" to="/AdminDash">AdminDash</Link>
        <Link className="a" to="/services">Services</Link>
        <Link className="a" to="/about">AboutUs</Link>
        <Link className="a" to="/contact">Contact</Link>
        <Link className="a" to="/business">Our Business</Link>
      </nav>
    </header>
  );
}

export default Header;
