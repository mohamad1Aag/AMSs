import React from 'react';
import './About.css'; // هذا هو ملف التنسيق CSS
import Header from "./Header";
function About() {
  return (<>
  <Header />
    <div className="About-container">
      <header>
        <h1>من نحن - موقع AMS للتجارة العامة</h1>
      </header>

      <div className="section">
        <h2>🌍 من نحن</h2>
        <p> 
            مجموعة AMS نسعى لنكون رقم واحد في التجارة العامة
        </p>
      </div>

      <div className="section">
        <h2>🎯 رؤيتنا</h2>
        <p>
          أن نكون الخيار الأول في عالم التجارة من خلال تقديم خدمات ذات جودة عالية تفوق توقعات عملائنا.
        </p>
      </div>

      <div className="section">
        <h2>💼 خدماتنا</h2>
        <ul>
          <li>التوصيل</li>
          <li>خضار</li>
          <li>فواكة</li>
          <li>البسة قطاسية </li>
        </ul>
      </div>

      <footer>
        <p>© 2025 مجموعة AMS. جميع الحقوق محفوظة.</p>
      </footer>
    </div></>
  );
}

export default About;
