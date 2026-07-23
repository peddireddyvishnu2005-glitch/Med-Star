'use client';

import React, { useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);

  // 1. Initialize Map instance
  useEffect(() => {
    if (!containerRef.current) return;

    if (!mapRef.current) {
      if ((containerRef.current as any)._leaflet_id) {
        delete (containerRef.current as any)._leaflet_id;
      }

      const initialLat = userLocation?.lat ?? selectedHospital?.lat ?? 40.7128;
      const initialLng = userLocation?.lng ?? selectedHospital?.lng ?? -74.0060;

      const map = L.map(containerRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      markersGroupRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (containerRef.current) {
        delete (containerRef.current as any)._leaflet_id;
      }
    };
  }, []);

  // 2. Update map view center when location or selected hospital changes
  useEffect(() => {
    if (!mapRef.current) return;
    const targetLat = userLocation?.lat ?? selectedHospital?.lat ?? 40.7128;
    const targetLng = userLocation?.lng ?? selectedHospital?.lng ?? -74.0060;

    const currentCenter = mapRef.current.getCenter();
    if (Math.abs(currentCenter.lat - targetLat) > 0.0001 || Math.abs(currentCenter.lng - targetLng) > 0.0001) {
      mapRef.current.setView([targetLat, targetLng], 13, { animate: true });
    }
  }, [userLocation?.lat, userLocation?.lng, selectedHospital?.lat, selectedHospital?.lng]);

  // 3. Update markers
  useEffect(() => {
    if (!mapRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    const userIcon = createCustomIcon('#0284c7');
    const hospitalIcon = createCustomIcon('#059669');
    const emergencyHospitalIcon = createCustomIcon('#dc2626', true);

    // User location marker
    if (userLocation) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon });
      userMarker.bindPopup(`
        <div class="p-1 text-slate-900 font-medium">
          <span class="font-bold text-sky-600">📍 You are here</span>
          <p class="text-xs text-slate-500">GPS Position Detected</p>
        </div>
      `);
      markersGroupRef.current.addLayer(userMarker);
    }

    // Hospital markers
    hospitals.forEach((hosp) => {
      const icon = hosp.hasEmergency ? emergencyHospitalIcon : hospitalIcon;
      const marker = L.marker([hosp.lat, hosp.lng], { icon });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-2 max-w-[220px]';
      popupContent.innerHTML = `
        <div class="flex items-center gap-1 mb-1">
          ${hosp.hasEmergency ? '<span class="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">24/7 EMERGENCY</span>' : ''}
          <span class="text-amber-500 font-bold text-xs ml-auto">⭐ ${hosp.rating}</span>
        </div>
        <h4 class="font-bold text-slate-900 text-sm leading-tight mb-1">${hosp.name}</h4>
        <p class="text-xs text-slate-600 mb-2">${hosp.address}, ${hosp.city}</p>
        ${hosp.hasEmergency ? `<p class="text-xs font-semibold text-emerald-700 mb-2">🏥 ${hosp.availableEmergencyBeds} ICU Beds Available</p>` : ''}
        <button id="nav-btn-${hosp.id}" class="w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow transition-colors flex items-center justify-center gap-1">
          🚀 Navigate Now
        </button>
      `;

      const navBtn = popupContent.querySelector(`#nav-btn-${hosp.id}`);
      if (navBtn) {
        navBtn.addEventListener('click', () => onNavigate(hosp));
      }

      marker.on('click', () => onSelectHospital(hosp));
      marker.bindPopup(popupContent);
      markersGroupRef.current?.addLayer(marker);
    });
  }, [hospitals, userLocation, onSelectHospital, onNavigate]);

  // 4. Update Route Polyline
  useEffect(() => {
    if (!mapRef.current) return;

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (routeGeometry && routeGeometry.length > 0) {
      polylineRef.current = L.polyline(routeGeometry, {
        color: '#0284c7',
        weight: 6,
        opacity: 0.85,
        dashArray: '1, 8'
      }).addTo(mapRef.current);
    }
  }, [routeGeometry]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50"
    />
  );
}
