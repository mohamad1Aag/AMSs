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

  useEffect(() => {
    axios.get('https://my-backend-dgp2.onrender.com/api/sections')
      .then(res => setSections(res.data))
      .catch(err => console.error('خطأ في جلب الأقسام:', err));
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sectionId) {
      setMessage('❌ يرجى اختيار قسم');
      return;
    }

    // قراءة التوكن من localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ يجب تسجيل الدخول كأدمن');
      return;
    }

    // فك تشفير التوكن لاستخراج adminId
    let adminId = null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      adminId = payload.id; // تأكد من اسم الحقل في البايلود
    } catch (error) {
      setMessage('❌ التوكن غير صالح');
      return;
    }

    // إنشاء FormData وإضافة adminId
    const formData = new FormData();
    formData.append('section', sectionId);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('adminId', adminId); // هنا أضفنا adminId

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
    <div className="p-6 bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-100 min-h-screen">
      {/* نموذج إضافة منتج */}
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">إضافة منتج جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="w-full p-2 border rounded focus:outline-none"
          />

          <input
            type="number"
            placeholder="السعر"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none"
          />

          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
          >
            ➕ إضافة المنتج
          </button>
        </form>

        {message && (
          <p className={`text-center mt-4 font-bold ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>

      {/* جدول المنتجات */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-center text-purple-700 mb-4">المنتجات المضافة</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد منتجات بعد.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-center border">
              <thead className="bg-purple-800 text-white">
                <tr>
                  <th className="p-2 border">الاسم</th>
                  <th className="p-2 border">السعر</th>
                  <th className="p-2 border">الصورة</th>
                  <th className="p-2 border">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} className="border-t">
                    <td className="p-2 border">{product.name}</td>
                    <td className="p-2 border">{product.price} ر.س</td>
                    <td className="p-2 border">
                      <img
                        src={product.image}
                        alt="صورة المنتج"
                        className="w-24 h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      >
                        🗑️ حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
