import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Categories/Category.css"; // نفس ملف CSS المستخدم

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
      // formData.append('name', editingProduct.name);
      formData.append('price', editingProduct.price);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await axios.put(
        `https://my-backend-dgp2.onrender.com/api/products/${editingProduct._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
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
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://my-backend-dgp2.onrender.com/api/products/delete/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      alert("حدث خطأ أثناء حذف المنتج");
      console.error(error);
    }
  };

  return (
    <div className="allsection">
      <h2>جميع المنتجات</h2>

      <input
        type="text"
        placeholder="ابحث باسم المنتج..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <p>لا توجد نتائج مطابقة.</p>
      ) : (
        <table className="sectiontable">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الوصف</th>
              <th>السعر</th>
              <th>الصورة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id}>
                <td><strong>{product.name}</strong></td>
                <td>{product.name}</td>
                <td>{product.price} ر.س</td>
                <td>
                  <img
                    className="tablesectionimage"
                    src={product.image}
                    alt="صورة المنتج"
                    style={{ width: '160px', height: 'auto', borderRadius: '8px' }}
                  />
                </td>
                <td>
                  <button onClick={() => handleEdit(product)}>تعديل</button>
                  <button onClick={() => handleDelete(product._id)} style={{ marginRight: '0.5rem', backgroundColor: '#d9534f', color: 'white' }}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingProduct && (
        <div className="edit-form" style={{ marginTop: '2rem', direction: 'rtl' }}>
          <h3>تعديل المنتج</h3>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
            placeholder="اسم المنتج"
          />
          
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
            placeholder="السعر"
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ marginTop: '1rem' }}
          />
          <button onClick={handleUpdate} style={{ marginTop: '1rem' }}>حفظ التعديلات</button>
          <button onClick={() => setEditingProduct(null)} style={{ marginTop: '1rem', marginLeft: '1rem' }}>إلغاء</button>
        </div>
      )}
    </div>
  );
};

export default ListProducts;
