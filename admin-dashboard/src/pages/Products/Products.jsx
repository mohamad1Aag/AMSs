import React, { useState } from "react";
import "./Products.css"; // ربط ملف CSS منفصل للمنتجات
import Sidebar from "../../layouts/sidebar";

export default function Product() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [searchTerm, setSearchTerm] = useState("");

  // بيانات المنتجات (كمثال)
  const products = [
    {
      id: 1,
      name: "قميص رجالي",
      category: "ملابس",
      price: 120,
      stock: 15,
      status: "متوفر",
    },
    {
      id: 2,
      name: "سماعة بلوتوث",
      category: "إلكترونيات",
      price: 250,
      stock: 0,
      status: "غير متوفر",
    },
    // ممكن تضيف منتجات أكثر
  ];

  // تصفية المنتجات حسب البحث (على اسم المنتج هنا كمثال)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
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

      <div className="product-container">
        <h2 className="title">إدارة المنتجات</h2>

        <input
          type="text"
          placeholder="ابحث باسم المنتج..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>اسم المنتج</th>
                <th>التصنيف</th>
                <th>السعر (ريال)</th>
                <th>المخزون</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td data-label="#">{index + 1}</td>
                    <td data-label="اسم المنتج">{product.name}</td>
                    <td data-label="التصنيف">{product.category}</td>
                    <td data-label="السعر">{product.price}</td>
                    <td data-label="المخزون">{product.stock}</td>
                    <td data-label="الحالة">
                      <span
                        className={`status ${
                          product.status === "متوفر" ? "active" : "inactive"
                        }`}
                      >
                        {product.status}
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
                  <td colSpan="7" style={{ textAlign: "center" }}>
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
