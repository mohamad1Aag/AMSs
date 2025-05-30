import React, { useState, useEffect } from 'react';
import './Cart.css';
import MapModal from './MapModal';

function Cart() {
  const [cart, setCart] = useState([]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(null); // موقع مؤقت أثناء اختيار الموقع
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedLocation = localStorage.getItem('deliveryLocation');
    if (savedLocation) {
      setDeliveryLocation(JSON.parse(savedLocation));
    }
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // عند تأكيد الموقع (عند إغلاق المودال)
  const handleConfirmLocation = () => {
    if (tempLocation) {
      setDeliveryLocation(tempLocation);
      localStorage.setItem('deliveryLocation', JSON.stringify(tempLocation));
      alert(`📍 تم اختيار موقع التوصيل: ${tempLocation.lat}, ${tempLocation.lng}`);
      setIsMapOpen(false);
      setTempLocation(null); // إعادة تعيين الموقع المؤقت
    } else {
      alert('يرجى تحديد موقع على الخريطة أولاً.');
    }
  };

  const handlePlaceOrder = async () => {
    if (!deliveryLocation) {
      alert('يرجى تحديد موقع التوصيل قبل تأكيد الطلب.');
      return;
    }

    try {
      const orderData = {
        products: cart.map(item => ({
          productId: item._id || item.productId || item.id,
          quantity: item.quantity,
        })),
        deliveryLocation,
        totalPrice: calculateTotal(),
        userId: "647c1b2f4f1c2b3a4d5e6789"
      };

      const response = await fetch('https://my-backend-dgp2.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ تم إرسال الطلب بنجاح!');
        setCart([]);
        setDeliveryLocation(null);
        localStorage.removeItem('cart');
        localStorage.removeItem('deliveryLocation');
      } else {
        alert('حدث خطأ أثناء إرسال الطلب: ' + (result.message || 'خطأ غير معروف'));
      }
    } catch (error) {
      alert('خطأ في الاتصال بالخادم.');
      console.error(error);
    }
  };

  if (cart.length === 0) return <p className="cart-container">🛒 السلة فارغة</p>;

  return (
    <div className="cart-container">
      <h2>🛒 سلة المشتريات</h2>
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image || 'https://dummyimage.com/100x100/000/fff.png&text=No+Image'} alt={item.name} />
          <div className="cart-item-details">
            <h4>{item.name}</h4>
            <p>الكمية: {item.quantity}</p>
            <p>النوع: {item.type}</p>
            <p>السعر الإجمالي: {item.price * item.quantity} ل.س</p>
          </div>
          <button onClick={() => removeFromCart(index)} className="remove-button">حذف</button>
        </div>
      ))}

      <h3 className="cart-total">المجموع الكلي: {calculateTotal()} ل.س</h3>

      <button onClick={() => setIsMapOpen(true)} className="map-button">📍 حدد موقع التوصيل</button>

      {deliveryLocation && (
        <button onClick={handlePlaceOrder} className="confirm-order-button">
          ✅ تأكيد الطلب
        </button>
        
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
