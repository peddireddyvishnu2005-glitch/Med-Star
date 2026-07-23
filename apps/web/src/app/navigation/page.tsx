'use client';

import React, { useState } from 'react';
import DynamicMap from '@/components/map/DynamicMap';
import NavigationDrawer from '@/components/navigation/NavigationDrawer';
import { INITIAL_HOSPITALS } from '@/lib/mockData';
import { calculateHaversineDistance, generateRouteGeometry } from '@/lib/geoUtils';
import { Hospital, RouteInfo, RouteHistoryItem } from '@/types';
import { MapPin, Navigation, Compass, AlertCircle, PhoneCall, CheckCircle } from 'lucide-react';

export default function NavigationPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 40.7128,
    lng: -74.0060
  });

  const [selectedHospital, setSelectedHospital] = useState<Hospital>(INITIAL_HOSPITALS[0]);
  const [activeRoute, setActiveRoute] = useState<RouteInfo | null>(() => {
    return generateRouteGeometry(40.7128, -74.0060, INITIAL_HOSPITALS[0].lat, INITIAL_HOSPITALS[0].lng);
  });
  const [isNavigating, setIsNavigating] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSelectHospital = (hosp: Hospital) => {
    setSelectedHospital(hosp);
    const route = generateRouteGeometry(userLocation.lat, userLocation.lng, hosp.lat, hosp.lng);
    setActiveRoute(route);
    setIsNavigating(true);
  };

  const handleCompleteNavigation = () => {
    if (!activeRoute) return;
    
    // Save route history log to local storage
    const newLog: RouteHistoryItem = {
      id: `route-${Date.now()}`,
      hospitalId: selectedHospital.id,
      hospitalName: selectedHospital.name,
      startLat: userLocation.lat,
      startLng: userLocation.lng,
      destLat: selectedHospital.lat,
      destLng: selectedHospital.lng,
      distanceKm: activeRoute.distanceKm,
      durationMins: activeRoute.durationMins,
      timestamp: new Date().toISOString()
    };

    const existingLogs = JSON.parse(localStorage.getItem('medstart_route_history') || '[]');
    localStorage.setItem('medstart_route_history', JSON.stringify([newLog, ...existingLogs]));

    setNotification(`Navigation session logged successfully! Saved to history.`);
    setTimeout(() => setNotification(null), 4000);
    setIsNavigating(false);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950">

      {/* Top Banner Notification */}
      {notification && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-2.5 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* Main Fullscreen Interactive Map */}
      <DynamicMap
        hospitals={INITIAL_HOSPITALS}
        userLocation={userLocation}
        selectedHospital={selectedHospital}
        routeGeometry={activeRoute?.geometry || null}
        onSelectHospital={handleSelectHospital}
        onNavigate={handleSelectHospital}
      />

      {/* Left Overlay Control Panel */}
      <div className="absolute top-4 left-4 z-40 max-w-sm w-full space-y-3">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-2xl">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-sky-400" />
            Select Destination Hospital
          </h2>

          <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {INITIAL_HOSPITALS.map((hosp) => (
              <button
                key={hosp.id}
                onClick={() => handleSelectHospital(hosp)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  selectedHospital.id === hosp.id
                    ? 'bg-sky-950/80 border-sky-500 text-sky-300 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <p className="font-semibold text-slate-100">{hosp.name}</p>
                  <p className="text-[10px] text-slate-400">{hosp.city} • {calculateHaversineDistance(userLocation.lat, userLocation.lng, hosp.lat, hosp.lng)} km away</p>
                </div>
                {hosp.hasEmergency && (
                  <span className="bg-red-600/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    ER
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Drawer */}
      {isNavigating && activeRoute && (
        <div className="absolute bottom-6 right-6 z-40">
          <NavigationDrawer
            hospital={selectedHospital}
            routeInfo={activeRoute}
            onClose={() => setIsNavigating(false)}
            onCompleteNavigation={handleCompleteNavigation}
          />
        </div>
      )}

    </div>
  );
}
