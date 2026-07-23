'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Hospital } from '@/types';

const createCustomIcon = (color: string, isEmergency: boolean = false) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="36" height="36">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      ${isEmergency ? '<circle cx="12" cy="9" r="6" fill="#ef4444" opacity="0.3"/>' : ''}
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: 'custom-leaflet-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

const userIcon = createCustomIcon('#0284c7');
const hospitalIcon = createCustomIcon('#059669');
const emergencyHospitalIcon = createCustomIcon('#dc2626', true);

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13, { animate: true });
  }, [center, map]);
  return null;
}

interface LeafletMapProps {
  hospitals: Hospital[];
  userLocation: { lat: number; lng: number } | null;
  selectedHospital: Hospital | null;
  routeGeometry: [number, number][] | null;
  onSelectHospital: (hosp: Hospital) => void;
  onNavigate: (hosp: Hospital) => void;
}

export default function LeafletMapContainer({
  hospitals,
  userLocation,
  selectedHospital,
  routeGeometry,
  onSelectHospital,
  onNavigate
}: LeafletMapProps) {
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (mapWrapperRef.current) {
        const leafletContainer = mapWrapperRef.current.querySelector('.leaflet-container');
        if (leafletContainer) {
          delete (leafletContainer as any)._leaflet_id;
        }
      }
    };
  }, []);

  const defaultCenter: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : selectedHospital
    ? [selectedHospital.lat, selectedHospital.lng]
    : [40.7128, -74.0060];

  return (
    <div
      ref={mapWrapperRef}
      className="w-full h-full min-h-[400px] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50"
    >
      <MapContainer
        key={`${defaultCenter[0]}-${defaultCenter[1]}`}
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <ChangeView center={defaultCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="p-1 text-slate-900 font-medium">
                <span className="font-bold text-sky-600">📍 You are here</span>
                <p className="text-xs text-slate-500">GPS Position Detected</p>
              </div>
            </Popup>
          </Marker>
        )}

        {hospitals.map((hosp) => (
          <Marker
            key={hosp.id}
            position={[hosp.lat, hosp.lng]}
            icon={hosp.hasEmergency ? emergencyHospitalIcon : hospitalIcon}
            eventHandlers={{
              click: () => onSelectHospital(hosp)
            }}
          >
            <Popup>
              <div className="p-2 max-w-[220px]">
                <div className="flex items-center gap-1 mb-1">
                  {hosp.hasEmergency && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      24/7 EMERGENCY
                    </span>
                  )}
                  <span className="text-amber-500 font-bold text-xs ml-auto">⭐ {hosp.rating}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{hosp.name}</h4>
                <p className="text-xs text-slate-600 mb-2">{hosp.address}, {hosp.city}</p>

                {hosp.hasEmergency && (
                  <p className="text-xs font-semibold text-emerald-700 mb-2">
                    🏥 {hosp.availableEmergencyBeds} ICU Beds Available
                  </p>
                )}

                <button
                  onClick={() => onNavigate(hosp)}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow transition-colors flex items-center justify-center gap-1"
                >
                  🚀 Navigate Now
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {routeGeometry && routeGeometry.length > 0 && (
          <Polyline
            positions={routeGeometry}
            color="#0284c7"
            weight={6}
            opacity={0.85}
            dashArray="1, 8"
          />
        )}
      </MapContainer>
    </div>
  );
}
