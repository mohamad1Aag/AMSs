import React, { useState } from "react";
import "./Products.css"; // ربط ملف CSS منفصل للمنتجات
import Sidebar from "../../layouts/Sidebar";
import ListProducts from "./ListProducts";
import AddProduct from "./AddProduct";

export default function Product() {
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

     
      <AddProduct />
      <ListProducts />
      

    </>
  );
}
