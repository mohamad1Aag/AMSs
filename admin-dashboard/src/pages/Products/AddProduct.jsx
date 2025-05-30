import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [sections, setSections] = useState([]);
  const [sectionId, setSectionId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    axios.get('https://my-backend-dgp2.onrender.com/api/sections')
      .then(res => setSections(res.data))
      .catch(err => console.error('خطأ في جلب الأقسام:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sectionId) {
      setMessage('❌ يرجى اختيار قسم');
      return;
    }

    const formData = new FormData();
    formData.append('section_id', sectionId);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const res = await axios.post(
        'https://my-backend-dgp2.onrender.com/api/products/add',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setMessage(`✅ تم إضافة المنتج: ${res.data.name}`);
      setName('');
      setPrice('');
      setSectionId('');
      setImage(null);
      if (fileRef.current) fileRef.current.value = '';
    } catch (err) {
      setMessage(`❌ خطأ: ${err.response?.data?.error || 'حدث خطأ'}`);
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '500px',
      margin: 'auto',
      background: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <select
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          required
          style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="">-- اختر القسم --</option>
          {sections.map(section => (
            <option key={section._id} value={section._id}>{section.name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={{ padding: '0.5rem' }}
        />

        <button type="submit" style={{
          backgroundColor: '#00b4db',
          color: 'white',
          padding: '0.8rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          ➕ إضافة المنتج
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontWeight: 'bold',
          color: message.includes('✅') ? 'green' : 'red'
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddProduct;
