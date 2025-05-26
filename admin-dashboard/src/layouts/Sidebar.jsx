// src/components/Sidebar.jsx
import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

import User from "../../../admin-dashboard/src/pages/Users/User"; 

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* زر إغلاق (X) */}
      {isOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="brand">Purple Admin</div>
            <button className="close-btn" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="00b4db">
                <path d="M18 6L6 18" stroke="#00b4db" strokeWidth="2"/>
                <path d="M6 6L18 18" stroke="#00b4db" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          <ul className="sidebar-menu">
            <li><Link to="/Dashboard">Dashboard</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/Product">Products</Link></li>
            <li><Link to="/Category">Categories</Link></li>
            <li><Link to="/Orders">Orders</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>

        </div>
      )}
    </>
  );
}

export default Sidebar;
