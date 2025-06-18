import React, { useState, useRef } from 'react';
import axios from 'axios';

const AddSection = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', image);

      const res = await axios.post(
        'https://my-backend-dgp2.onrender.com/api/sections/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage(`✅ تم إضافة القسم: ${res.data.name}`);
      setName('');
      setDescription('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setMessage(`❌ خطأ: ${err.response?.data?.error || 'حدث خطأ'}`);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-100 min-h-screen flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">إضافة قسم جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="اسم القسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <textarea
            placeholder="وصف القسم"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full"
          />
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-md transition"
          >
            ➕ إضافة
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-bold ${
              message.includes('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddSection;
