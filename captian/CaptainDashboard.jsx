import React, { useEffect, useState } from "react";
import axios from "axios";
import CaptainMap from "./CaptainMap";
import { useNavigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

const CaptainDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [captainName, setCaptainName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("captainToken");
      if (!token) {
        navigate("/captain/login");
        return;
      }

      const payload = parseJwt(token);
      if (!payload || !payload.name) {
        navigate("/captain/login");
        return;
      }
      setCaptainName(payload.name);

      try {
        setLoading(true);
        const res = await axios.get("https://my-backend-dgp2.onrender.com/api/all/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        setError("فشل تحميل الطلبات");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("captainToken");
    navigate("/captain/login");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg font-semibold">جارٍ تحميل الطلبات...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800">لوحة تحكم الكابتن</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded transition"
        >
          تسجيل خروج
        </button>
      </header>

      <section className="mb-4">
        <p className="text-gray-700 text-lg">
          مرحباً <span className="font-semibold text-purple-700">{captainName}</span>، هذه الطلبات الخاصة بك.
        </p>
      </section>

      <CaptainMap captainName={captainName} orders={orders} />
    </div>
  );
};

export default CaptainDashboard;
