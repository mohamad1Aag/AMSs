import React, { useState } from "react";
import "./Category.css"; // ربط ملف CSS خاص بالأقسام
import Sidebar from "../../layouts/Sidebar";

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

      <div className="category-container">
        <h2 className="title">إدارة الأقسام</h2>

        <input
          type="text"
          placeholder="ابحث باسم القسم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="table-wrapper">
          <table className="category-table">
            <thead>
              <tr>
                <th>#</th>
                <th>اسم القسم</th>
                <th>الوصف</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr key={category.id}>
                    <td data-label="#">{index + 1}</td>
                    <td data-label="اسم القسم">{category.name}</td>
                    <td data-label="الوصف">{category.description}</td>
                    <td data-label="الحالة">
                      <span
                        className={`status ${
                          category.status === "مفعل" ? "active" : "inactive"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td data-label="إجراءات">
                      <button className="btn btn-view">عرض</button>
                      <button className="btn btn-edit">تعديل</button>
                      <button className="btn btn-delete">حذف</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    لا توجد نتائج مطابقة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
