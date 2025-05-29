import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Category.css"; // ربط ملف CSS خاص بالأقسام

const ListSections = () => {
  const [sections, setSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSection, setEditingSection] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // لتعديل الصورة

  useEffect(() => {
    axios.get('https://my-backend-dgp2.onrender.com/api/sections')
      .then(res => setSections(res.data))
      .catch(err => console.error('خطأ بجلب الأقسام:', err));
  }, []);

  // فلترة الأقسام حسب الاسم
  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (section) => {
    setEditingSection(section);
    setSelectedFile(null);
  };

  // التعامل مع رفع ملف الصورة (اختياري)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // حفظ التعديلات
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editingSection.name);
      formData.append('description', editingSection.description);

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await axios.put(
        `https://my-backend-dgp2.onrender.com/api/sections/edit/${editingSection._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // تحديث قائمة الأقسام
      setSections(sections.map(sec =>
        sec._id === response.data._id ? response.data : sec
      ));

      setEditingSection(null);
      setSelectedFile(null);

    } catch (error) {
      alert('فشل تعديل القسم، حاول مرة أخرى');
      console.error(error);
    }
  };

  return (
    <div className="allsection">
      <h2>جميع الأقسام</h2>

      <input
        type="text"
        placeholder="ابحث باسم القسم..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredSections.length === 0 ? (
        <p>لا توجد نتائج مطابقة.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الوصف</th>
              <th>الصورة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredSections.map(section => (
              <tr key={section._id}>
                <td><strong>{section.name}</strong></td>
                <td>{section.description}</td>
                <td>
                <img
                  src={section.image}
                  alt="صورة القسم"
                  style={{ width: '160px', height: 'auto', borderRadius: '8px' }}
                />

                </td>
                <td>
                  <button onClick={() => handleEdit(section)}>تعديل</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingSection && (
        <div className="edit-form" style={{ marginTop: '2rem', direction: 'rtl' }}>
          <h3>تعديل القسم</h3>
          <input
            type="text"
            value={editingSection.name}
            onChange={(e) => setEditingSection({ ...editingSection, name: e.target.value })}
            placeholder="اسم القسم"
          />
          <textarea
            value={editingSection.description}
            onChange={(e) => setEditingSection({ ...editingSection, description: e.target.value })}
            placeholder="الوصف"
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ marginTop: '1rem' }}
          />
          <button onClick={handleUpdate} style={{ marginTop: '1rem' }}>حفظ التعديلات</button>
          <button onClick={() => setEditingSection(null)} style={{ marginTop: '1rem', marginLeft: '1rem' }}>إلغاء</button>
        </div>
      )}
    </div>
  );
};

export default ListSections;
