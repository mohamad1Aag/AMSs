import React, { useState } from "react";
import Sidebar from "../layouts/Sidebar";

export default function AdminDash() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* زر فتح القائمة */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-2 bg-purple-600 rounded-md shadow-lg hover:bg-purple-700 transition"
          aria-label="Open sidebar"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}

      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div className="min-h-screen bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-200 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* بطاقة 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <p className="text-purple-700 text-lg font-semibold mb-2">Weekly Sales</p>
            <p className="text-3xl font-bold mb-1">4000$</p>
            <p className="text-green-600 font-medium">Increased 60%</p>
          </div>

          {/* بطاقة 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <p className="text-purple-700 text-lg font-semibold mb-2">Weekly Orders</p>
            <p className="text-3xl font-bold mb-1">4000</p>
            <p className="text-green-600 font-medium">Increased 5%</p>
          </div>

          {/* بطاقة 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
            <p className="text-purple-700 text-lg font-semibold mb-2">Visitors Online</p>
            <p className="text-3xl font-bold mb-1">4000</p>
            <p className="text-green-600 font-medium">Increased 6%</p>
          </div>
        </div>
      </div>
    </>
  );
}
