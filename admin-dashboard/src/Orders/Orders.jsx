import React, { useState } from "react";
import "./Orders.css"; // ملف CSS خاص بالطلبات
import Sidebar from "../layouts/Sidebar";

export default function Orders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [searchTerm, setSearchTerm] = useState("");

  // بيانات الطلبات كمثال (يمكنك تعديلها حسب مشروعك)
  const orders = [
    {
      id: 1001,
      customerName: "محمد علي",
      date: "2025-05-20",
      totalAmount: 250.75,
      status: "مكتمل",
      paymentMethod: "بطاقة ائتمان",
      deliveryStatus: "تم التوصيل",
    },
    {
      id: 1002,
      customerName: "سارة أحمد",
      date: "2025-05-22",
      totalAmount: 120.0,
      status: "قيد المعالجة",
      paymentMethod: "الدفع عند الاستلام",
      deliveryStatus: "قيد التوصيل",
    },
    {
      id: 1003,
      customerName: "خالد يوسف",
      date: "2025-05-23",
      totalAmount: 330.5,
      status: "ملغي",
      paymentMethod: "بطاقة ائتمان",
      deliveryStatus: "غير مطبق",
    },
    // أضف المزيد حسب الحاجة
  ];

  // تصفية الطلبات بالبحث في رقم الطلب أو اسم العميل
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
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

      <div className="orders-container">
        <h2 className="title">إدارة الطلبات</h2>

        <input
          type="text"
          placeholder="ابحث برقم الطلب أو اسم العميل..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>#</th>
                <th>رقم الطلب</th>
                <th>اسم العميل</th>
                <th>تاريخ الطلب</th>
                <th>المبلغ الكلي</th>
                <th>حالة الطلب</th>
                <th>طريقة الدفع</th>
                <th>حالة التوصيل</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td data-label="#">{index + 1}</td>
                    <td data-label="رقم الطلب">{order.id}</td>
                    <td data-label="اسم العميل">{order.customerName}</td>
                    <td data-label="تاريخ الطلب">{order.date}</td>
                    <td data-label="المبلغ الكلي">{order.totalAmount.toFixed(2)} ر.س</td>
                    <td data-label="حالة الطلب">
                      <span
                        className={`status ${
                          order.status === "مكتمل"
                            ? "completed"
                            : order.status === "قيد المعالجة"
                            ? "processing"
                            : "cancelled"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td data-label="طريقة الدفع">{order.paymentMethod}</td>
                    <td data-label="حالة التوصيل">{order.deliveryStatus}</td>
                    <td data-label="إجراءات">
                      <button className="btn btn-view">عرض</button>
                      <button className="btn btn-edit">تعديل</button>
                      <button className="btn btn-delete">حذف</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
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
