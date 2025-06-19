import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function SectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [section, setSection] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState('مفرق');
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

    const existingIndex = cart.findIndex(
      (item) => item._id === selectedProduct._id && item.type === type
    );

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

    setToastMessage(`✅ تمت إضافة ${selectedProduct.name} إلى السلة`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!section)
    return (
      <p className="text-center mt-10 text-yellow-200 font-semibold">جارٍ تحميل تفاصيل القسم...</p>
    );

  return (
    <div
      className="p-6 max-w-7xl mx-auto relative min-h-screen text-white"
      style={{
        background: 'linear-gradient(to right, #5a189a, #7b2ff7)',
      }}
    >
      {/* زر السلة */}
      <div className="fixed top-6 right-6 z-50">
        <button
          className="relative bg-yellow-400 text-purple-900 px-5 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition flex items-center gap-3 text-lg font-bold"
          onClick={() => navigate('/cart')}
          aria-label="عرض السلة"
          title="عرض السلة"
        >
          🛒 سلة التسوق
          {totalItemsInCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-900 text-yellow-400 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
              {totalItemsInCart}
            </span>
          )}
        </button>
      </div>

      {/* تفاصيل القسم */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-purple-900 bg-opacity-30 rounded-xl p-8 shadow-xl max-w-5xl mx-auto">
        <img
          src={section.image || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={section.name}
          className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">{section.name}</h2>
          <p className="text-lg leading-relaxed text-yellow-200">{section.description}</p>
        </div>
      </section>

      {/* عنوان المنتجات */}
      <h3 className="text-3xl font-bold mt-16 mb-8 drop-shadow-md">المنتجات:</h3>

      {/* شبكة المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.length === 0 && (
          <p className="col-span-full text-center text-yellow-200">لا توجد منتجات في هذا القسم.</p>
        )}
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white text-gray-900 rounded-xl shadow-lg p-5 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={product.image || 'https://dummyimage.com/150x150/000/fff.png&text=No+Image'}
              alt={product.name}
              className="w-full h-44 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-110"
              onClick={() => openModal(product)}
              loading="lazy"
            />
            <h4 className="font-semibold text-center text-purple-900">{product.name}</h4>
            <p className="text-purple-800 font-bold mt-1 text-center">{product.price} ل.س</p>
            <button
              onClick={() => openModal(product)}
              className="mt-4 px-6 py-2 bg-purple-700 text-white rounded-lg shadow hover:bg-purple-800 transition transform hover:-translate-y-1 active:translate-y-0"
            >
              أضف إلى السلة
            </button>
          </div>
        ))}
      </div>

      {/* نافذة تحديد الكمية والنوع */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg p-7 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-5 text-center text-purple-800">تحديد الكمية</h3>
            <p className="mb-6 text-center text-purple-700 font-semibold">{selectedProduct?.name}</p>

            <div className="flex justify-center items-center gap-6 mb-8">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition text-xl font-bold"
              >
                −
              </button>
              <span className="text-2xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition text-xl font-bold"
              >
                +
              </button>
            </div>

            <div className="mb-8 text-center">
              <label htmlFor="type" className="mr-3 font-semibold text-gray-700">
                النوع:
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="مفرق">مفرق</option>
                <option value="جملة">جملة</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={confirmAddToCart}
                className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition font-semibold"
              >
                تأكيد الإضافة
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* الرسالة المنبثقة */}
      {showToast && (
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-7 py-3 rounded-lg shadow-lg animate-fade-in-out z-50 font-semibold"
        >
          {toastMessage}
        </div>
      )}

      {/* أنيميشن الرسالة */}
      <style>{`
        @keyframes fade-in-out {
          0%, 100% {opacity: 0;}
          10%, 90% {opacity: 1;}
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default SectionDetails;
