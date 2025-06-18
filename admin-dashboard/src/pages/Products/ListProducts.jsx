import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('https://my-backend-dgp2.onrender.com/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('خطأ بجلب المنتجات:', err));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product) => {
    setEditingProduct(product);
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
      formData.append('name', editingProduct.name);
      formData.append('price', editingProduct.price);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await axios.put(
        `https://my-backend-dgp2.onrender.com/api/products/${editingProduct._id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setProducts(products.map(prod =>
        prod._id === response.data._id ? response.data : prod
      ));
      setEditingProduct(null);
      setSelectedFile(null);
    } catch (error) {
      alert('فشل تعديل المنتج، حاول مرة أخرى');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) return;

    try {
      await axios.delete(`https://my-backend-dgp2.onrender.com/api/products/delete/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      alert("حدث خطأ أثناء حذف المنتج");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-900">جميع المنتجات</h2>

      <input
        type="text"
        placeholder="ابحث باسم المنتج..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mx-auto mb-6 px-4 py-2 rounded border shadow focus:outline-none focus:ring-2 focus:ring-purple-600 block"
      />

      {filteredProducts.length === 0 ? (
        <p className="text-center text-purple-900">لا توجد نتائج مطابقة.</p>
      ) : (
        <div className="overflow-x-auto max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full text-sm text-center rounded">
            <thead className="bg-purple-800 text-white rounded-t-xl">
              <tr>
                <th className="p-3">الاسم</th>
                <th className="p-3">الوصف</th>
                <th className="p-3">السعر</th>
                <th className="p-3">الصورة</th>
                <th className="p-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id} className="border-b last:border-b-0">
                  <td className="p-3 font-semibold">{product.name}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.price} ر.س</td>
                  <td className="p-3">
                    <img
                      src={product.image}
                      alt="صورة المنتج"
                      className="w-24 h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-3 py-1 rounded font-semibold transition"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingProduct && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
          <h3 className="text-lg font-bold mb-4 text-center text-purple-800">تعديل المنتج</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              placeholder="اسم المنتج"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              placeholder="السعر"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full"
            />
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={handleUpdate}
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded font-semibold transition"
              >
                حفظ التعديلات
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-semibold transition"
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

export default ListProducts;
