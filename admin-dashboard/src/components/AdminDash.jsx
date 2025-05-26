import React, { useState } from "react";
import "./AdminDash.css";
import Sidebar from "../layouts/Sidebar";

export default function AdminDash() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* زر فتح القائمة */}
      {!sidebarOpen && (
        <button className="open-btn" onClick={toggleSidebar}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#00b4db">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="#00b4db" strokeWidth="2" />
          </svg>
        </button>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div className="bigDAshcontainer">
        <div className="cardDashboardforViewInformation">
          <div className="smallCard">
            <p className='p1'>Weekly Sales</p>
            <p>4000$</p>
            <p className='p3'>incresed 60%</p>
          </div>
          <div className="smallCard">
            <p className='p1'>Weekly order</p>
            <p>4000</p>
            <p className='p3'>incresed 5%</p>
          </div>
          <div className="smallCard">
            <p className='p1'>vistors online </p>
            <p>4000</p>
            <p className='p3'>incresed 6%</p>
          </div>
        </div>
      </div>
    </>
  );
}
