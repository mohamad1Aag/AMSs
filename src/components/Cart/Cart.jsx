import React, { useState, useEffect } from 'react';
import MapModal from './MapModal';
import { useNavigate } from 'react-router-dom';

// دالة لفك تشفير JWT واستخراج البيانات من البايلود
function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

function Cart() {
  const [cart, setCart] = useState([]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedLocation = localStorage.getItem('deliveryLocation');
    if (savedLocation) setDeliveryLocation(JSON.parse(savedLocation));

    document.body.style.background = 'linear-gradient(to right, #5a189a, #7b2ff7)';
    document.body.style.minHeight = '100vh';

    return () => {
      document.body.style.background = null;
      document.body.style.minHeight = null;
    };
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, idx) => idx !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!deliveryLocation) {
      alert('يرجى تحديد موقع التوصيل قبل تأكيد الطلب.');
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('يرجى تسجيل الدخول أولًا.');
      navigate('/login');
      return;
    }

    const payload = parseJwt(token);
    if (!payload || !payload.id) {
      alert('توكن غير صالح، يرجى تسجيل الدخول مجددًا.');
      navigate('/login');
      return;
    }

    const userId = payload.id;

    try {
      const orderData = {
        userId,
        products: cart.map((item) => ({
          productId: item._id || item.productId || item.id,
          vendorId: item.vendorId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          type: item.type,
        })),
        deliveryLocation,
        notes: 'طلب جديد من التطبيق',
        total: calculateTotal(), // ✅ أضف هذا السطر
      };
      console.log(orderData);
      const response = await fetch(
        'https://my-backend-dgp2.onrender.com/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // إرسال التوكن في هيدر الطلب
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert('✅ تم إرسال الطلب بنجاح!');
        setCart([]);
        setDeliveryLocation(null);
        localStorage.removeItem('cart');
        localStorage.removeItem('deliveryLocation');
        navigate('/');
      } else {
        alert('❌ حدث خطأ أثناء إرسال الطلب: ' + (result.message || 'خطأ غير معروف'));
      }
    } catch (error) {
      alert('❌ خطأ في الاتصال بالخادم.');
      console.error(error);
    }
  };

  if (cart.length === 0)
    return (
      <p className="text-center mt-20 text-yellow-200 font-semibold text-xl">
        🛒 السلة فارغة
      </p>
    );

  return (
    <div
      className="p-6 max-w-5xl mx-auto min-h-screen text-white"
      style={{ background: 'linear-gradient(to right, #5a189a, #7b2ff7)' }}
    >
      <h2 className="text-4xl font-extrabold mb-8 drop-shadow-lg text-center">
        🛒 سلة المشتريات
      </h2>

      <div className="space-y-6">
        {cart.map((item, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-80 rounded-xl shadow-lg p-5 flex items-center gap-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={item.image || 'https://dummyimage.com/100x100/000/fff.png&text=No+Image'}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
              loading="lazy"
            />
            <div className="flex-grow text-gray-900">
              <h4 className="text-xl font-semibold mb-1">{item.name}</h4>
              <p>الكمية: <span className="font-medium">{item.quantity}</span></p>
              <p>النوع: <span className="font-medium">{item.type}</span></p>
              <p className="mt-2 font-bold">
                السعر الإجمالي: {item.price * item.quantity} ل.س
              </p>
            </div>
            <button
              onClick={() => removeFromCart(index)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
              aria-label={`حذف ${item.name} من السلة`}
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      <h3 className="text-right mt-10 text-2xl font-semibold text-yellow-200 drop-shadow">
        المجموع الكلي: <span className="font-bold">{calculateTotal()} ل.س</span>
      </h3>

      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-6">
        <button
          onClick={() => setIsMapOpen(true)}
          className="bg-purple-900 hover:bg-purple-950 text-yellow-300 px-8 py-3 rounded-full shadow-lg transition flex items-center justify-center gap-3 font-bold"
          aria-label="فتح خريطة تحديد موقع التوصيل"
        >
          📍 حدد موقع التوصيل
        </button>

        {deliveryLocation && (
          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 hover:bg-green-700 text-yellow-300 px-8 py-3 rounded-full shadow-lg transition font-bold"
            aria-label="تأكيد الطلب"
          >
            ✅ تأكيد الطلب
          </button>
        )}
      </div>

      {deliveryLocation && (
        <p className="mt-6 text-center font-semibold text-yellow-200 drop-shadow">
          📌 موقع التوصيل المختار: ({deliveryLocation.lat.toFixed(5)}, {deliveryLocation.lng.toFixed(5)})
        </p>
      )}

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onConfirmLocation={(confirmedLocation) => {
          setDeliveryLocation(confirmedLocation);
          localStorage.setItem('deliveryLocation', JSON.stringify(confirmedLocation));
          alert(`📍 تم اختيار موقع التوصيل: ${confirmedLocation.lat}, ${confirmedLocation.lng}`);
          setIsMapOpen(false);
        }}
      />
    </div>
  );
}

export default Cart;
