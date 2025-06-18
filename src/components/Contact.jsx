import React from 'react';
import Header from "./Header";

function Contact() {
  return (
    <>
      <Header />
      <div className="min-h-screen py-10 px-4 flex justify-center items-start
        bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-100">
        <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-6 md:p-8 lg:p-12 max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">📞 اتصل بنا</h1>

          <p className="mb-8 text-gray-700 text-center text-base sm:text-lg">
            نحن في <strong className="text-purple-800">مجموعة AMS</strong> سعداء بخدمتكم والرد على استفساراتكم في أي وقت.
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">معلومات الاتصال</h2>
            <ul className="text-gray-700 space-y-2 text-base sm:text-lg">
              <li><strong>📍 العنوان:</strong> شارع 8 اذار مقابل المشفى العسكري</li>
              <li><strong>📞 الهاتف:</strong> +9639999999999999</li>
              <li><strong>📧 البريد الإلكتروني:</strong> info@servisedasdawd.com</li>
              <li><strong>🕐 ساعات العمل:</strong> الأحد - الخميس (9 صباحًا - 5 مساءً)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">أرسل لنا رسالة</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="الاسم الكامل"
                required
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                required
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <textarea
                placeholder="اكتب رسالتك هنا..."
                rows="5"
                required
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-3 rounded hover:bg-purple-800 transition-colors font-semibold"
              >
                إرسال
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
