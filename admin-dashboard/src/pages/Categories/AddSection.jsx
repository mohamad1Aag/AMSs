import React, { useState, useRef } from 'react'; // ✅ أضف useRef
import axios from 'axios';

const AddSection = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null); // ✅

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
      if (fileInputRef.current) fileInputRef.current.value = ''; // ✅ مسح اختيار الصورة
    } catch (err) {
      setMessage(`❌ خطأ: ${err.response?.data?.error || 'حدث خطأ'}`);
    }
  };

  return (
    <div className="addsection" style={{ padding: '2rem' }}>
      <h2>إضافة قسم جديد</h2>
      <form className="addSectionForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="اسم القسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="وصف القسم"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef} // ✅
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">➕ إضافة</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddSection;
