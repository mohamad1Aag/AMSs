import React, { useState } from "react";
import "./Category.css"; // ربط ملف CSS خاص بالأقسام
import Sidebar from "../../layouts/Sidebar";
import AddSection from './AddSection';
import ListSections from './ListSections';


export default function Category() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [searchTerm, setSearchTerm] = useState("");

  // بيانات الأقسام كمثال
  const categories = [
    {
      id: 1,
      name: "ملابس",
      description: "قسم الملابس الرجالية والنسائية",
      status: "مفعل",
    },
    {
      id: 2,
      name: "إلكترونيات",
      description: "هواتف ذكية، سماعات، أجهزة كمبيوتر",
      status: "غير مفعل",
    },
    // يمكنك إضافة المزيد
  ];

  // تصفية الأقسام حسب البحث (على اسم القسم هنا كمثال)
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
     
      
      <AddSection />
          <ListSections />
    </>
  );
}
