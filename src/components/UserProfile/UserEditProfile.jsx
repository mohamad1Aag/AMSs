import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://my-backend-dgp2.onrender.com/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("فشل جلب بيانات المستخدم");

        const data = await res.json();
        setUserData(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-800 font-semibold">
        جاري تحميل البيانات...
      </div>
    );

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-200 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">يرجى تسجيل الدخول</h2>
          <LoginForm onLoginSuccess={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">تعديل بيانات المستخدم</h2>
        <PointsBlock points={userData.point ?? 0} />
        <EditUserForm userData={userData} setUserData={setUserData} />
      </div>
    </div>
  );
}

function PointsBlock({ points }) {
  return (
    <div className="mb-6 p-4 bg-purple-100 rounded-lg shadow-md text-center font-semibold text-purple-800 text-xl select-none">
      <span className="inline-block mr-2 text-2xl">⭐</span>
      نقاطك: <span className="font-bold">{points}</span>
    </div>
  );
}

function EditUserForm({ userData, setUserData }) {
  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("userToken");

    try {
      const res = await fetch("https://my-backend-dgp2.onrender.com/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error("فشل تحديث البيانات");

      alert("✅ تم تحديث البيانات بنجاح");

      const updatedRes = await fetch("https://my-backend-dgp2.onrender.com/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = await updatedRes.json();
      setUserData(updatedData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-purple-800">الاسم</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 font-semibold text-purple-800">البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md font-semibold transition disabled:opacity-50"
      >
        {loading ? "جاري التحديث..." : "تحديث البيانات"}
      </button>
    </form>
  );
}
