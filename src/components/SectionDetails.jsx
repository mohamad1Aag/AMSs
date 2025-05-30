import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SectionDetails() {
  const { id } = useParams();
  const [section, setSection] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // للحالة الخاصة بالنافذة
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState('مفرق');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSection();
    fetchProducts();
  }, []);

  const fetchSection = async () => {
    try {
      const res = await axios.get(`https://my-backend-dgp2.onrender.com/api/sections`);
      const matchedSection = res.data.find((sec) => sec._id === id);
      setSection(matchedSection);
    } catch (error) {
      console.error('خطأ أثناء جلب بيانات القسم:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://my-backend-dgp2.onrender.com/api/by-section/${id}`);
      setProducts(res.data);
    } catch (error) {
      console.error('خطأ أثناء جلب المنتجات:', error);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setType('مفرق');
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    if (!selectedProduct) return;

    const existingIndex = cart.findIndex((item) => item._id === selectedProduct._id && item.type === type);
    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { ...selectedProduct, quantity, type }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setShowModal(false);
    alert(`تمت إضافة ${selectedProduct.name} إلى السلة`);
  };

  if (!section) return <p>جارٍ تحميل تفاصيل القسم...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{section.name}</h2>
      <img
        src={section.image || 'https://via.placeholder.com/300'}
        alt={section.name}
        style={{ width: '300px', height: '200px', objectFit: 'cover' }}
      />
      <p>{section.description}</p>

      <h3 style={{ marginTop: '30px' }}>المنتجات:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product._id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            width: '200px',
            backgroundColor: '#fff'
          }}>
            <img
              src={product.image || 'https://dummyimage.com/150x150/000/fff.png&text=No+Image'}
              alt={product.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h4>{product.name}</h4>
            <p>{product.price} ل.س</p>
            <button onClick={() => openModal(product)} style={{ marginTop: '10px' }}>
              أضف إلى السلة
            </button>
          </div>
        ))}
      </div>

      {/* نافذة منبثقة لتحديد الكمية */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 999
        }}>
          <div style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '10px',
            width: '300px', textAlign: 'center'
          }}>
            <h3>تحديد الكمية</h3>
            <p>{selectedProduct?.name}</p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>

            <div style={{ marginTop: '15px' }}>
              <label>النوع: </label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="مفرق">مفرق</option>
                <option value="جملة">جملة</option>
              </select>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button onClick={confirmAddToCart}>تأكيد الإضافة</button>{' '}
              <button onClick={() => setShowModal(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SectionDetails;
