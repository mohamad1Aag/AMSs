import React, { useState } from "react";
import "./UserProfile.css";
import Header from "../Header.jsx";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "محمد علي",
    email: "user@example.com",
    phone: "0999123456",
    address: "دمشق، سوريا",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم حفظ التعديلات!");
    // إرسال البيانات للـ backend هنا
  };

  return (<>
        <Header />
      <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">الملف الشخصي</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>الاسم الكامل</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>رقم الهاتف</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>العنوان</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>كلمة المرور الجديدة (اختياري)</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-save">
            حفظ التعديلات
          </button>
        </form>
      </div>
    </div>
    </>  );
}
