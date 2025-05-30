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
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [from, to, map]);

  return null;
};

const CaptainMap = ({ order }) => {
  const [captainLocation, setCaptainLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCaptainLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error(err)
    );
  }, []);

  // ✅ تم التعديل هنا
  const orderLocation = order?.deliveryLocation || null;

  if (!captainLocation || !orderLocation)
    return <p>جارٍ تحميل الخريطة...</p>;

  return (
    <MapContainer
      center={[captainLocation.lat, captainLocation.lng]}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[captainLocation.lat, captainLocation.lng]}>
        <Popup>موقع الكابتن الحالي</Popup>
      </Marker>
      <Marker position={[orderLocation.lat, orderLocation.lng]}>
        <Popup>موقع التوصيل</Popup>
      </Marker>
      <Routing from={captainLocation} to={orderLocation} />
    </MapContainer>
  );
};

export default CaptainMap;
