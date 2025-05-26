import React, { useState } from "react";
import "./User.css"; // لا تنسَ ربط ملف CSS
import Sidebar from "../../layouts/Sidebar";
export default function User() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
 



  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+96650000000",
      role: "بائع",
      status: "مفعل",
    },
    {
      id: 2,
      name: "سارة علي",
      email: "sara@example.com",
      phone: "+96651112222",
      role: "عميل",
      status: "غير مفعل",
    },
    // ممكن تضيف بيانات أكثر هنا...
  ];

  // تصفية المستخدمين حسب البحث (الاسم فقط هنا كمثال)
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (<>
    {/* زر فتح القائمة */}
 {!sidebarOpen && (
    <button className="open-btn" onClick={toggleSidebar}>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#00b4db">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="#00b4db" strokeWidth="2" />
      </svg>
    </button>
  )}

  <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />



    <div className="user-container">
      <h2 className="title">إدارة المستخدمين</h2>

      <input
        type="text"
        placeholder="ابحث بالاسم..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>الاسم</th>
              <th>البريد</th>
              <th>الهاتف</th>
              <th>الدور</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td data-label="#">{index + 1}</td>
                  <td data-label="الاسم">{user.name}</td>
                  <td data-label="البريد">{user.email}</td>
                  <td data-label="الهاتف">{user.phone}</td>
                  <td data-label="الدور">{user.role}</td>
                  <td data-label="الحالة">
                    <span
                      className={`status ${
                        user.status === "مفعل" ? "active" : "inactive"
                      }`}
                    >
                      {user.status}
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
    </>);
}
