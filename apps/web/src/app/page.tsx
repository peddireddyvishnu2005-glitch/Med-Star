'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DynamicMap from '@/components/map/DynamicMap';
import HospitalCard from '@/components/hospital/HospitalCard';
import { INITIAL_HOSPITALS, INITIAL_DEPARTMENTS } from '@/lib/mockData';
import { calculateHaversineDistance, generateRouteGeometry } from '@/lib/geoUtils';
import { Hospital, RouteInfo } from '@/types';
import { 
  Search, 
  MapPin, 
  AlertCircle, 
  Filter, 
  SlidersHorizontal, 
  Building2, 
  HeartPulse, 
  ShieldCheck, 
  Sparkles,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);

  // GPS Location State
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({
    lat: 40.7128,
    lng: -74.0060 // Default Metropolis/NY GPS center
  });
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string>('Metropolis, NY (Default)');

  // Map & Route selection state
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(INITIAL_HOSPITALS[0]);
  const [activeRoute, setActiveRoute] = useState<RouteInfo | null>(null);

  // Trigger HTML5 Geolocation API
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setLocationStatus('Acquiring high-accuracy GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(coords);
        setIsLocating(false);
        setLocationStatus(`GPS Locked (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`);
      },
      (error) => {
        console.warn('GPS location permission denied, using default Metropolis GPS center.', error);
        setIsLocating(false);
        setLocationStatus('Permission Denied — Using Metropolis, NY fallback');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Calculate distance for all hospitals relative to user location
  const hospitalsWithDistance = useMemo(() => {
    return INITIAL_HOSPITALS.map((hosp) => {
      const dist = userLocation
        ? calculateHaversineDistance(userLocation.lat, userLocation.lng, hosp.lat, hosp.lng)
        : 0;
      return { ...hosp, distanceKm: dist };
    });
  }, [userLocation]);

  // Filtered Hospital List
  const filteredHospitals = useMemo(() => {
    return hospitalsWithDistance.filter((hosp) => {
      const matchesSearch =
        hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.departments.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCity = selectedCity === 'ALL' || hosp.city === selectedCity;
      const matchesDept = selectedDepartment === 'ALL' || hosp.departments.includes(selectedDepartment);
      const matchesEmergency = !emergencyOnly || hosp.hasEmergency;
      const matchesRating = hosp.rating >= minRating;

      return matchesSearch && matchesCity && matchesDept && matchesEmergency && matchesRating;
    }).sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }, [hospitalsWithDistance, searchQuery, selectedCity, selectedDepartment, emergencyOnly, minRating]);

  // Handle direct navigation trigger
  const handleNavigate = (hosp: Hospital) => {
    const startLat = userLocation ? userLocation.lat : 40.7306;
    const startLng = userLocation ? userLocation.lng : -73.9352;
    const route = generateRouteGeometry(startLat, startLng, hosp.lat, hosp.lng);

    setSelectedHospital(hosp);
    setActiveRoute(route);

    // Scroll to interactive map section or navigate
    const mapElement = document.getElementById('interactive-map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 pb-16">

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-950/40 via-slate-950 to-slate-950 overflow-hidden">
        
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Enterprise Healthcare Directory & Turn-by-Turn GPS Guidance
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Discover Nearby Hospitals & Get <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">Fastest Turn-by-Turn Directions</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real-time emergency bed availability, specialized medical departments, verified doctor rosters, and instant route optimization.
          </p>

          {/* Main Search & GPS Bar Box */}
          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-2xl space-y-3">
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              
              {/* Input field */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by hospital name, city, or medical specialty..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* GPS Detection Button */}
              <button
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <Compass className={`w-4 h-4 text-sky-400 ${isLocating ? 'animate-spin' : ''}`} />
                {isLocating ? 'Locating...' : 'Detect GPS Location'}
              </button>

            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setEmergencyOnly(!emergencyOnly)}
                  className={`px-3 py-1.5 rounded-lg border font-semibold transition-all flex items-center gap-1.5 ${
                    emergencyOnly
                      ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  🚨 24/7 Emergency Available
                </button>

                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-slate-950 text-slate-300 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="ALL">All Cities</option>
                  <option value="Metropolis">Metropolis</option>
                  <option value="Brooklyn">Brooklyn</option>
                  <option value="Queens">Queens</option>
                </select>

                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="bg-slate-950 text-slate-300 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="ALL">All Specialties</option>
                  {INITIAL_DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <span className="text-slate-500 font-medium text-[11px]">
                {locationStatus}
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Specialty Department Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-sky-400" />
              Browse by Specialty Department
            </h2>
            <p className="text-xs text-slate-400">Filter care providers by medical expertise</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {INITIAL_DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(selectedDepartment === dept.name ? 'ALL' : dept.name)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedDepartment === dept.name
                  ? 'bg-sky-950/80 border-sky-500 text-sky-300 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <h4 className="font-bold text-sm text-slate-100 mb-1">{dept.name}</h4>
              <p className="text-[10px] text-slate-400 line-clamp-2">{dept.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Main Hospital Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-sky-400" />
              Verified Nearby Hospitals ({filteredHospitals.length})
            </h2>
            <p className="text-xs text-slate-400">Sorted by radial GPS proximity and user rating</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Min Rating:</span>
            {[0, 4, 4.5, 4.8].map((star) => (
              <button
                key={star}
                onClick={() => setMinRating(star)}
                className={`px-2.5 py-1 rounded-md font-bold transition-all border ${
                  minRating === star
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {star === 0 ? 'All' : `${star}★+`}
              </button>
            ))}
          </div>
        </div>

        {filteredHospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Hospitals Match Current Filters</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try resetting your search query, city dropdown, or emergency filters to view all available medical centers.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('ALL');
                setSelectedDepartment('ALL');
                setEmergencyOnly(false);
                setMinRating(0);
              }}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Interactive Map Section */}
      <section id="interactive-map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-400" />
              Live Interactive Map & Route Preview
            </h2>
            <p className="text-xs text-slate-400">Click any marker or navigate button to calculate route polylines</p>
          </div>

          <button
            onClick={() => router.push('/navigation')}
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-sky-950/60 px-3 py-1.5 rounded-lg border border-sky-800/40"
          >
            Launch Fullscreen Map
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="h-[500px] w-full">
          <DynamicMap
            hospitals={filteredHospitals}
            userLocation={userLocation}
            selectedHospital={selectedHospital}
            routeGeometry={activeRoute?.geometry || null}
            onSelectHospital={(hosp) => setSelectedHospital(hosp)}
            onNavigate={handleNavigate}
          />
        </div>
      </section>

    </div>
  );
}
