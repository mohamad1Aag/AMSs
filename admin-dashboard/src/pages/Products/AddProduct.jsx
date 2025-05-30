import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [sections, setSections] = useState([]);
  const [products, setProducts] = useState([]);
  const [sectionId, setSectionId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const fileRef = useRef(null);

  // 🟢 جلب الأقسام
  useEffect(() => {
    axios.get('https://my-backend-dgp2.onrender.com/api/sections')
      .then(res => setSections(res.data))
      .catch(err => console.error('خطأ في جلب الأقسام:', err));
  }, []);

  // 🟢 جلب المنتجات
  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://my-backend-dgp2.onrender.com/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('فشل جلب المنتجات:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🟢 حذف المنتج
  const handleDelete = async (productId) => {
    if (!window.confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) return;
    try {
      await axios.delete(`https://my-backend-dgp2.onrender.com/api/products/${productId}`);
      setMessage('✅ تم حذف المنتج');
      fetchProducts();
    } catch (err) {
      setMessage('❌ فشل في حذف المنتج');
    }
  };

  // 🟢 إضافة منتج
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sectionId) {
      setMessage('❌ يرجى اختيار قسم');
      return;
    }

    const formData = new FormData();
    formData.append('section', sectionId);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const res = await axios.post(
        'https://my-backend-dgp2.onrender.com/api/products',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setMessage(`✅ تم إضافة المنتج: ${res.data.name}`);
      setName('');
      setPrice('');
      setSectionId('');
      setImage(null);
      if (fileRef.current) fileRef.current.value = '';
      fetchProducts();
    } catch (err) {
      setMessage(`❌ خطأ: ${err.response?.data?.error || 'حدث خطأ'}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* ✅ نموذج إضافة منتج */}
      <div style={{
        maxWidth: '500px',
        margin: 'auto',
        background: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '2rem',
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

      {/* ✅ عرض المنتجات */}
      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ textAlign: 'center' }}>المنتجات المضافة</h2>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center' }}>لا توجد منتجات بعد.</p>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '1rem',
            direction: 'rtl'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#eee' }}>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>الاسم</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>السعر</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>الصورة</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{product.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{product.price} ر.س</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    <img src={product.image} alt="صورة المنتج" width="100" style={{ borderRadius: '8px' }} />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    <button onClick={() => handleDelete(product._id)} style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      🗑️ حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
