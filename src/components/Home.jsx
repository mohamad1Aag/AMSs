// src/components/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";  // استيراد Link
import './Home.css';

function Home() {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <div className="main">
      <header className="header">
        <div className="logo"></div>
        <button className="menu-btn" onClick={toggleNav} >
          <svg width="30" height="30" viewBox="0 0 100 80" fill="#00b4db">
            <rect width="100" height="15"></rect>
            <rect y="30" width="100" height="15"></rect>
            <rect y="60" width="100" height="15"></rect>
          </svg> {/* أيقونة الهامبرغر */}
        </button>
        <nav className={`nav ${navVisible ? "active" : ""}`}>
          <Link to="/">Logo</Link>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">AboutUs</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/business">Our Business</Link>
        </nav>
      </header>

      <div className="content">
        <h3>اهلا بكم في موقع AMS.WEB لتطوير وبرمجة مواقع الويب</h3>
        <div className="main-box">AMS.WEB</div>
        <Link to="/services">
          <button className="btn">الذهاب الي صفحة الخدمات</button>
        </Link>
      </div>
    </div>
  )
}

export default Home;
