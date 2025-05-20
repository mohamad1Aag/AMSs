import React from 'react';
import './Contact.css';
import Header from "./Header";

function Contact() {
  return (<>
    <Header/>
    <div className="contactus-container">
      <h1>📞 اتصل بنا</h1>
      <p>نحن في <strong>مجموعة AMS</strong> سعداء بخدمتكم والرد على استفساراتكم في أي وقت.</p>

      <div className="contact-info">
        <h2>معلومات الاتصال</h2>
        <ul>
          <li><strong>📍 العنوان:</strong> شارع 8 اذار مقابل المشفى العسكري</li>
          <li><strong>📞 الهاتف:</strong> +9639999999999999</li>
          <li><strong>📧 البريد الإلكتروني:</strong> info@servisedasdawd.com</li>
          <li><strong>🕐 ساعات العمل:</strong> الأحد - الخميس (9 صباحًا - 5 مساءً)</li>
        </ul>
      </div>

      <div className="contact-form">
        <h2>أرسل لنا رسالة</h2>
        <form>
          <input type="text" placeholder="الاسم الكامل" required />
          <input type="email" placeholder="البريد الإلكتروني" required />
          <textarea placeholder="اكتب رسالتك هنا..." rows="5" required></textarea>
          <button type="submit">إرسال</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Contact;
