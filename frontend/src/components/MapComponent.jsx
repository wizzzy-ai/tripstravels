import React, { lazy, Suspense } from 'react';
import { FaMapPin } from 'react-icons/fa';

const MapContainer = lazy(() => import('react-leaflet').then(m => ({ default: m.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(m => ({ default: m.TileLayer })));
const Marker = lazy(() => import('react-leaflet').then(m => ({ default: m.Marker })));
const Popup = lazy(() => import('react-leaflet').then(m => ({ default: m.Popup })));

const MapComponent = ({ location, title, city }) => {
  if (!location || !location.lat || !location.lng) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
        <div className="text-center">
          <FaMapPin className="text-6xl text-gray-400 mx-auto mb-4 animate-bounce" />
          <h4 className="text-xl font-bold text-gray-600 mb-2">Map Not Available</h4>
          <p className="text-gray-500">Location coordinates are being loaded...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="h-96 bg-gray-200 rounded-xl flex items-center justify-center">Loading map...</div>}>
      <div style={{ height: '400px', width: '100%' }}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '12px' }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.05},${location.lat - 0.05},${location.lng + 0.05},${location.lat + 0.05}&layer=mapnik&marker=${location.lat},${location.lng}`}
          title="Location Map"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </Suspense>
  );
};

export default MapComponent;
