import React, { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://my-backend-dgp2.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ تم التسجيل بنجاح، يمكنك تسجيل الدخول الآن.");
        // لو حابب تمسح الحقول بعد التسجيل:
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "❌ فشل في التسجيل");
      }
    } catch (error) {
      alert("❌ حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <div className="flex flex-col">
        <label className="mb-2 text-purple-800 font-semibold">الاسم الكامل</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-purple-800 font-semibold">البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-purple-800 font-semibold">كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-md font-semibold transition"
      >
        {loading ? "جاري التسجيل..." : "تسجيل"}
      </button>
    </form>
  );
}
