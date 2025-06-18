import React from 'react';
import Header from "./Header";

function About() {
  return (
    <>
      <Header />
      <div className="min-h-screen py-10 px-2 sm:px-4 flex justify-center items-start
        bg-gradient-to-r from-[#4B0082] via-[#FF69B4] via-[#FFA07A] to-[#FFFACD] overflow-hidden">
        <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-3 sm:p-6 md:p-8 lg:p-12 max-w-full max-w-sm sm:max-w-md md:max-w-4xl w-full">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4" style={{ color: '#5B21B6' }}>
              من نحن - موقع AMS للتجارة العامة
            </h1>
            <hr className="border-t-2 w-20 sm:w-24 mx-auto" style={{ borderColor: '#F97316' }} />
          </header>

          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#F97316' }}>
              🌍 من نحن
            </h2>
            <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#374151' }}>
              مجموعة AMS نسعى لنكون رقم واحد في التجارة العامة
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#F97316' }}>
              🎯 رؤيتنا
            </h2>
            <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#374151' }}>
              أن نكون الخيار الأول في عالم التجارة من خلال تقديم خدمات ذات جودة عالية تفوق توقعات عملائنا.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#F97316' }}>
              💼 خدماتنا
            </h2>
            <ul className="list-disc list-inside space-y-1 text-base sm:text-lg" style={{ color: '#374151' }}>
              <li>التوصيل</li>
              <li>خضار</li>
              <li>فواكة</li>
              <li>البسة قطاسية</li>
            </ul>
          </section>

          <footer className="text-center text-sm sm:text-base mt-10 border-t pt-4" style={{ color: '#14B8A6', borderColor: '#F97316' }}>
            © 2025 مجموعة AMS. جميع الحقوق محفوظة.
          </footer>
        </div>
      </div>
    </>
  );
}

export default About;
