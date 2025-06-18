import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function UserProfile() {
  const handleLoginSuccess = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-900">تسجيل الدخول</h2>
        <LoginForm onLoginSuccess={handleLoginSuccess} />

        <hr className="my-12 border-purple-300" />

        <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-900">إنشاء حساب</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
