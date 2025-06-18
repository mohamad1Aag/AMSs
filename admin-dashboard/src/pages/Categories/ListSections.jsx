import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListSections = () => {
  const [sections, setSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSection, setEditingSection] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios.get('https://my-backend-dgp2.onrender.com/api/sections')
      .then(res => setSections(res.data))
      .catch(err => console.error('خطأ بجلب الأقسام:', err));
  }, []);

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (section) => {
    setEditingSection(section);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

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
    <div className="p-6 bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">جميع الأقسام</h2>

      <input
        type="text"
        placeholder="ابحث باسم القسم..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mx-auto mb-6 px-4 py-2 rounded border shadow focus:outline-none focus:ring-2 focus:ring-purple-500 block"
      />

      {filteredSections.length === 0 ? (
        <p className="text-center text-white">لا توجد نتائج مطابقة.</p>
      ) : (
        <div className="overflow-x-auto max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full text-center text-sm md:text-base rounded-xl">
            <thead className="bg-purple-800 text-white rounded-xl">
              <tr>
                <th className="p-3">الاسم</th>
                <th className="p-3">الوصف</th>
                <th className="p-3">الصورة</th>
                <th className="p-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredSections.map(section => (
                <tr key={section._id} className="border-t">
                  <td className="p-3 font-semibold">{section.name}</td>
                  <td className="p-3">{section.description}</td>
                  <td className="p-3">
                    <img
                      src={section.image}
                      alt="صورة القسم"
                      className="w-40 h-24 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEdit(section)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    >
                      تعديل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingSection && (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-center text-purple-800">تعديل القسم</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={editingSection.name}
              onChange={(e) => setEditingSection({ ...editingSection, name: e.target.value })}
              placeholder="اسم القسم"
              className="w-full border rounded px-4 py-2"
            />
            <textarea
              value={editingSection.description}
              onChange={(e) => setEditingSection({ ...editingSection, description: e.target.value })}
              placeholder="الوصف"
              className="w-full border rounded px-4 py-2 resize-none"
              rows={4}
            />
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full"
            />
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded"
              >
                حفظ التعديلات
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListSections;
