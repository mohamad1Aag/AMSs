// src/components/Services.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';
import Header from './Header';

function Services() {
  const [sections, setSections] = useState([]);

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

  return (
    <>
      <div className="bigcontanier">
        <Header />
        <div className="container">
          {sections.map((section) => (
            <a key={section._id} href={`/section/${section._id}`}>
              <div className="card">
                <div className="photocard">
                  <img
                    src={section.image || 'https://via.placeholder.com/150'}
                    alt={section.name || 'صورة قسم'}
                  />
                </div>
                <div className="texxt">{section.name}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
