'use client';

import React, { useState } from 'react';
import DynamicMap from '@/components/map/DynamicMap';
import NavigationDrawer from '@/components/navigation/NavigationDrawer';
import { INITIAL_HOSPITALS } from '@/lib/mockData';
import { calculateHaversineDistance, generateRouteGeometry } from '@/lib/geoUtils';
import { Hospital, RouteInfo, RouteHistoryItem } from '@/types';
import { Compass, CheckCircle, Navigation, Radio, Search, Target, Play } from 'lucide-react';

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
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSelectHospital = (hosp: Hospital) => {
    setSelectedHospital(hosp);
    const route = generateRouteGeometry(userLocation.lat, userLocation.lng, hosp.lat, hosp.lng);
    setActiveRoute(route);
    setIsNavigating(true);
  };

  const handleRecenterGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        if (selectedHospital) {
          setActiveRoute(generateRouteGeometry(coords.lat, coords.lng, selectedHospital.lat, selectedHospital.lng));
        }
        setNotification('GPS Recentered to your device coordinates!');
        setTimeout(() => setNotification(null), 3000);
      });
    }
  };

  const handleSimulateDrive = () => {
    setIsSimulating(!isSimulating);
    setNotification(isSimulating ? 'Drive simulation paused' : '🚘 Live GPS Drive Simulation Started');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCompleteNavigation = () => {
    if (!activeRoute) return;
    
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

    let existingLogs: RouteHistoryItem[] = [];
    try {
      const saved = localStorage.getItem('medstart_route_history');
      if (saved && saved.trim() && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          existingLogs = parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse history:', e);
    }

    localStorage.setItem('medstart_route_history', JSON.stringify([newLog, ...existingLogs]));

    setNotification(`Navigation session logged successfully! Saved to history.`);
    setTimeout(() => setNotification(null), 4000);
    setIsNavigating(false);
  };

  const filteredHospitals = INITIAL_HOSPITALS.filter(h => 
    h.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    h.city.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-950">

      {notification && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600/90 text-white px-5 py-2 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 backdrop-blur-md animate-bounce glow-emerald">
          <CheckCircle className="w-4 h-4" />
          {notification}
        </div>
      )}

      {/* Top Live Telemetry HUD Bar */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-slate-800 px-4 py-2 rounded-full shadow-2xl text-xs text-slate-200 glow-sky">
        <div className="flex items-center gap-1.5 font-bold text-sky-400">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>GPS Proximity Active</span>
        </div>
        <span className="text-slate-600">|</span>
        <span className="font-semibold text-slate-300">
          Dest: <strong className="text-white">{selectedHospital.name}</strong> ({activeRoute?.distanceKm} km)
        </span>
        <span className="text-slate-600">|</span>
        <button
          onClick={handleRecenterGps}
          className="flex items-center gap-1 font-bold text-sky-300 hover:text-white bg-sky-950/80 px-2.5 py-1 rounded-full border border-sky-800/60 transition-colors"
        >
          <Target className="w-3.5 h-3.5" />
          Recenter GPS
        </button>
        <button
          onClick={handleSimulateDrive}
          className={`flex items-center gap-1 font-bold px-2.5 py-1 rounded-full border transition-colors ${
            isSimulating ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          {isSimulating ? 'Pause Drive' : 'Simulate Drive'}
        </button>
      </div>

      <DynamicMap
        hospitals={INITIAL_HOSPITALS}
        userLocation={userLocation}
        selectedHospital={selectedHospital}
        routeGeometry={activeRoute?.geometry || null}
        onSelectHospital={handleSelectHospital}
        onNavigate={handleSelectHospital}
      />

      {/* Destination Selector Floating Panel */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:top-4 sm:left-4 z-40 max-w-sm w-auto space-y-3">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-3 sm:p-4 rounded-3xl shadow-2xl space-y-2 glow-sky">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" />
              Select Destination Hospital
            </h2>
            <span className="text-[10px] font-extrabold bg-sky-950 text-sky-300 px-2 py-0.5 rounded-full border border-sky-800/40">
              {filteredHospitals.length} centers
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search destination..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-1.5 max-h-36 sm:max-h-44 overflow-y-auto pr-1">
            {filteredHospitals.map((hosp) => (
              <button
                key={hosp.id}
                onClick={() => handleSelectHospital(hosp)}
                className={`w-full p-2.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                  selectedHospital.id === hosp.id
                    ? 'bg-sky-950/90 border-sky-500 text-sky-300 font-bold shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <p className="font-semibold text-slate-100">{hosp.name}</p>
                  <p className="text-[10px] text-slate-400">{hosp.city} • {calculateHaversineDistance(userLocation.lat, userLocation.lng, hosp.lat, hosp.lng)} km away</p>
                </div>
                {hosp.hasEmergency && (
                  <span className="bg-red-600/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0">
                    ER
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isNavigating && activeRoute && (
        <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:bottom-6 sm:right-6 z-40 max-w-md">
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
