import React, { useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import AddSection from './AddSection';
import ListSections from './ListSections';

export default function Category() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [searchTerm, setSearchTerm] = useState("");

  // بيانات الأقسام كمثال (لو بدك تستبدلها بـ API بعدين)
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
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-100 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* زر فتح القائمة */}
        {!sidebarOpen && (
          <button
            className="mb-4 p-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white"
            onClick={toggleSidebar}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        {/* مكون إضافة قسم */}
        <AddSection />

        {/* مكون عرض الأقسام */}
        <ListSections
          categories={filteredCategories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
}
