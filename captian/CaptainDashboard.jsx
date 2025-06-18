import React, { useEffect, useState } from 'react';
import CaptainMap from './CaptainMap';
import axios from 'axios';

const CaptainDashboard = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get('https://my-backend-dgp2.onrender.com/api/all/orders/');
      setOrder(res.data[0]); // أول طلب مؤقتاً
    };

    // تدرج خلفية للجسم
    document.body.style.background = 'linear-gradient(to right, #5a189a, #7b2ff7)';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';

    return () => {
      document.body.style.background = '';
      document.body.style.minHeight = '';
      document.body.style.margin = '';
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(to right, #5a189a, #7b2ff7)',
      }}
    >
      <div className="w-full max-w-5xl bg-white bg-opacity-90 rounded-xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6 drop-shadow">
          🚚 لوحة الكابتن – تفاصيل الطلب
        </h2>

        {order ? (
          <div className="rounded-lg overflow-hidden border border-purple-200 shadow">
            <CaptainMap order={order} />
          </div>
        ) : (
          <p className="text-center text-xl text-gray-700 font-semibold">
            لا يوجد طلبات حالياً.
          </p>
        )}
      </div>
    </div>
  );
};

export default CaptainDashboard;
