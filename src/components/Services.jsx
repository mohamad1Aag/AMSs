import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom'; // استيراد Link
function Services() {
  const [sections, setSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await axios.get('https://my-backend-dgp2.onrender.com/api/sections');
      setSections(res.data);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب الأقسام:', error);
    }
  };

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-200">
        <Header />

        {/* حقل البحث */}
        <div className="max-w-md mx-auto my-8 px-4">
          <input
            type="text"
            placeholder="ابحث باسم القسم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-md
              focus:outline-none focus:ring-4 focus:ring-purple-400
              transition placeholder-purple-400 text-purple-900 font-semibold"
          />
        </div>

        {/* شبكة الكروت */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {filteredSections.length === 0 ? (
            <p className="col-span-full text-center text-gray-700 text-base sm:text-lg font-medium">
              لا توجد نتائج مطابقة.
            </p>
          ) : (
           
            filteredSections.map((section) => (
              <Link
                key={section._id}
                to={`/section/${section._id}`}  // هنا الرابط داخل التطبيق
                className="group block bg-white rounded-2xl shadow-md overflow-hidden
                  transform hover:scale-105 hover:shadow-xl transition-transform duration-300"
                title={section.name}
              >
                {/* باقي المحتوى بدون تغيير */}
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Services;
