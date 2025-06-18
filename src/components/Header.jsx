import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <header className="bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:py-6">
        {/* اللوجو */}
        <div className="text-white font-bold text-xl md:text-2xl cursor-pointer select-none">
          AMS
        </div>

        {/* زر الهامبرغر */}
        <button
          onClick={toggleNav}
          className="md:hidden focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg width="30" height="30" viewBox="0 0 100 80" fill="#00b4db">
            <rect width="100" height="15" rx="3"></rect>
            <rect y="30" width="100" height="15" rx="3"></rect>
            <rect y="60" width="100" height="15" rx="3"></rect>
          </svg>
        </button>

        {/* قائمة الروابط */}
        <nav
          className={`
            absolute top-full left-0 w-full bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-100 md:static md:w-auto md:flex md:items-center
            transition-all duration-300 ease-in-out
            ${navVisible ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden md:overflow-visible md:opacity-100"}
          `}
        >
          <Link
            to="/"
            className="block md:inline-block px-4 py-3 text-white hover:text-cyan-400 transition-colors text-center md:text-left"
            onClick={() => setNavVisible(false)}
          >
            Home
          </Link>
          <Link
            to="/AdminDash"
            className="block md:inline-block px-4 py-3 text-white hover:text-cyan-400 transition-colors text-center md:text-left"
            onClick={() => setNavVisible(false)}
          >
            AdminDash
          </Link>
          <Link
            to="/services"
            className="block md:inline-block px-4 py-3 text-white hover:text-cyan-400 transition-colors text-center md:text-left"
            onClick={() => setNavVisible(false)}
          >
            Services
          </Link>
          <Link
            to="/about"
            className="block md:inline-block px-4 py-3 text-white hover:text-cyan-400 transition-colors text-center md:text-left"
            onClick={() => setNavVisible(false)}
          >
            AboutUs
          </Link>
          <Link
            to="/contact"
            className="block md:inline-block px-4 py-3 text-white hover:text-cyan-400 transition-colors text-center md:text-left"
            onClick={() => setNavVisible(false)}
          >
            Contact
          </Link>
          <Link
            to="/UserProfile"
            className="block md:inline-block px-4 py-3 text-white hover:text-cyan-400 transition-colors text-center md:text-left"
            onClick={() => setNavVisible(false)}
          >
            UserProfile
          </Link>
          <Link
            to="/CaptainDashboard"
            className="block md:inline-block px-4 py-3 text-white hover:text-cyan-400 transition-colors text-center md:text-left"
            onClick={() => setNavVisible(false)}
          >
            CaptainDashboard
          </Link>
          <Link
            to="/ProductList"
            className="block md:inline-block px-4 py-3 text-white hover:text-cyan-400 transition-colors text-center md:text-left"
            onClick={() => setNavVisible(false)}
          >
            Cart
          </Link>
          <Link
            to="/UserEditProfile"
            className="block md:inline-block px-4 py-3 text-white hover:text-cyan-400 transition-colors text-center md:text-left"
            onClick={() => setNavVisible(false)}
          >
            UserEditProfile
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
