import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapModal.css';

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ selectedPosition, setSelectedPosition }) {
  useMapEvents({
    click(e) {
      setSelectedPosition(e.latlng);
    }
  });

  return selectedPosition ? <Marker position={selectedPosition} /> : null;
}

function MapModal({ isOpen, onClose, setDeliveryLocation }) {
  const [selectedPosition, setSelectedPosition] = useState(null);

  const latLatakia = [35.537, 35.776];
  const zoomLevel = 12;

  useEffect(() => {
    setDeliveryLocation(selectedPosition);
  }, [selectedPosition, setDeliveryLocation]);

  const handleConfirm = () => {
    if (selectedPosition) {
      onClose();
    } else {
      alert('يرجى اختيار موقع على الخريطة.');
    }
  };

  const handleCancel = () => {
    setSelectedPosition(null);
    setDeliveryLocation(null);
    onClose();
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('المتصفح لا يدعم تحديد الموقع الجغرافي.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const latlng = { lat: latitude, lng: longitude };
        setSelectedPosition(latlng);
      },
      () => alert('تعذر الحصول على الموقع الحالي.'),
      { enableHighAccuracy: true }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>حدد موقع التوصيل (ضمن نطاق اللاذقية)</h3>
        <MapContainer
          center={latLatakia}
          zoom={zoomLevel}
          style={{ height: '400px', width: '100%' }}
          whenCreated={map => {
            const bounds = [
              [35.38, 35.60],
              [35.65, 35.95],
            ];
            map.setMaxBounds(bounds);
            map.on('drag', () => {
              if (!map.getBounds().contains(map.getCenter())) {
                map.panInsideBounds(bounds, { animate: true });
              }
            });
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker selectedPosition={selectedPosition} setSelectedPosition={setSelectedPosition} />
        </MapContainer>

        <div className="modal-buttons">
          <button onClick={handleUseCurrentLocation}>📍 تحديد موقعي الحالي</button>
          <button onClick={handleCancel}>❌ إلغاء التحديد</button>
          <button onClick={handleConfirm}>✅ تأكيد الموقع</button>
        </div>
      </div>
    </div>
  );
}

export default MapModal;
