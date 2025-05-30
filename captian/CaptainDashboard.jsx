import React, { useEffect, useState } from 'react';
import CaptainMap from './CaptainMap';
import axios from 'axios';

const CaptainDashboard = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get('https://my-backend-dgp2.onrender.com/api/all/orders/'); // أو مسار خاص بالكابتن
      setOrder(res.data[0]); // ← أول طلب للتجربة
    };

    fetchOrder();
  }, []);

  return (
    <div>
      <h2>طلب التوصيل</h2>
      {order ? <CaptainMap order={order} /> : <p>لا يوجد طلبات حالياً</p>}
    </div>
  );
};

export default CaptainDashboard;
