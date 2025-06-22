import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const Routing = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: () => null,
    }).addTo(map);

    return () => {
      if (routingControl) map.removeControl(routingControl);
    };
  }, [from, to, map]);

  return null;
};

const CaptainMap = ({ captainName, orders }) => {
  const [captainLocation, setCaptainLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('الميزة غير مدعومة في هذا المتصفح.');
      setLoadingLocation(false);
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCaptainLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoadingLocation(false);
      },
      (err) => {
        console.error('خطأ في الحصول على الموقع:', err);
        alert('تعذر الحصول على موقع الكابتن. تأكد من تفعيل صلاحيات الموقع.');
        setLoadingLocation(false);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (!orders || !Array.isArray(orders))
    return <p className="text-center mt-10 text-gray-600">جارٍ تحميل الطلبات...</p>;

  const captainOrders = orders.filter(order => order.captainName === captainName);

  if (loadingLocation)
    return <p className="text-center mt-10 text-blue-600 font-semibold">جارٍ الحصول على موقع الكابتن...</p>;

  if (!captainLocation)
    return (
      <div className="text-center mt-10 text-red-600">
        تعذر الحصول على موقع الكابتن.
        <button
          onClick={getLocation}
          className="ml-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          حاول مرة أخرى
        </button>
      </div>
    );

  if (captainOrders.length === 0)
    return (
      <p className="text-center mt-10 text-gray-700 font-semibold">
        لا توجد طلبات مخصصة للكابتن <span className="text-purple-700">{captainName}</span>
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-800">
          الطلبات المخصصة للكابتن <span className="underline">{captainName}</span> ({captainOrders.length})
        </h2>
        <button
          onClick={getLocation}
          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          title="تحديث الموقع"
        >
          تحديث الموقع
        </button>
      </div>

      <MapContainer
        center={[captainLocation.lat, captainLocation.lng]}
        zoom={13}
        style={{ height: '600px', width: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[captainLocation.lat, captainLocation.lng]}>
          <Popup>
            <div className="text-center">
              <strong>موقع الكابتن:</strong> <br />
              <span className="text-purple-700 font-semibold">{captainName}</span>
            </div>
          </Popup>
        </Marker>

        {captainOrders.map(order =>
          order.deliveryLocation?.lat && order.deliveryLocation?.lng ? (
            <Marker
              key={order._id}
              position={[order.deliveryLocation.lat, order.deliveryLocation.lng]}
              icon={L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [35, 35],
                iconAnchor: [17, 35],
                popupAnchor: [0, -35],
              })}
            >
              <Popup>
                <div className="space-y-1">
                  <p><strong>رقم الطلب:</strong> {order._id}</p>
                  <p><strong>الحالة:</strong> <span className="capitalize">{order.status}</span></p>
                  <p><strong>ملاحظات:</strong> {order.notes || '-'}</p>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}

        {captainOrders.map(order =>
          order.deliveryLocation?.lat && order.deliveryLocation?.lng ? (
            <Routing key={`route-${order._id}`} from={captainLocation} to={order.deliveryLocation} />
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default CaptainMap;
