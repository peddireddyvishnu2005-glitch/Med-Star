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
  Building2, 
  HeartPulse, 
  Sparkles,
  Compass,
  ArrowRight,
  PhoneCall,
  Activity,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({
    lat: 40.7128,
    lng: -74.0060
  });
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string>('Metropolis, NY (Default)');

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(INITIAL_HOSPITALS[0]);
  const [activeRoute, setActiveRoute] = useState<RouteInfo | null>(null);

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

  const hospitalsWithDistance = useMemo(() => {
    return INITIAL_HOSPITALS.map((hosp) => {
      const dist = userLocation
        ? calculateHaversineDistance(userLocation.lat, userLocation.lng, hosp.lat, hosp.lng)
        : 0;
      return { ...hosp, distanceKm: dist };
    });
  }, [userLocation]);

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

  const handleNavigate = (hosp: Hospital) => {
    const startLat = userLocation ? userLocation.lat : 40.7306;
    const startLng = userLocation ? userLocation.lng : -73.9352;
    const route = generateRouteGeometry(startLat, startLng, hosp.lat, hosp.lng);

    setSelectedHospital(hosp);
    setActiveRoute(route);

    const mapElement = document.getElementById('interactive-map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 pb-16 relative">

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-950/50 via-slate-950 to-slate-950 overflow-hidden">
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Enterprise Healthcare Directory & GPS Guidance
            </div>

            <a
              href="tel:911"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold shadow-lg border border-red-500/40 glow-red transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              Direct Emergency SOS: 911 / 112
            </a>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Discover Nearby Hospitals & Get <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">Fastest Turn-by-Turn Directions</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Real-time emergency bed availability, specialized medical departments, verified doctor rosters, and instant route optimization.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto text-xs">
            <div className="bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full text-emerald-400 font-bold flex items-center gap-1.5 backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              124 ICU Beds Available Live
            </div>
            <div className="bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full text-sky-300 font-bold flex items-center gap-1.5 backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Avg Dispatch Time: 4.2 Mins
            </div>
            <div className="bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full text-amber-300 font-bold flex items-center gap-1.5 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              100% Verified Trauma Centers
            </div>
          </div>

          {/* Search Controls Card */}
          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800/90 p-3.5 sm:p-5 rounded-2xl shadow-2xl glow-sky space-y-3.5">
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by hospital name, city, or medical specialty..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold border border-sky-500 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-sky-600/20"
              >
                <Compass className={`w-4 h-4 text-white ${isLocating ? 'animate-spin' : ''}`} />
                {isLocating ? 'Locating...' : 'Detect GPS Location'}
              </button>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-3 border-t border-slate-800/80 text-xs">
              <button
                onClick={() => setEmergencyOnly(!emergencyOnly)}
                className={`w-full px-3 py-2 rounded-xl border font-bold transition-all flex items-center justify-center gap-1.5 ${
                  emergencyOnly
                    ? 'bg-red-600 text-white border-red-500 shadow-lg glow-red'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                🚨 24/7 Emergency Only
              </button>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-950 text-slate-300 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="ALL">All Cities</option>
                <option value="Metropolis">Metropolis</option>
                <option value="Brooklyn">Brooklyn</option>
                <option value="Queens">Queens</option>
              </select>

              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full bg-slate-950 text-slate-300 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="ALL">All Specialties</option>
                {INITIAL_DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>

            <div className="text-center pt-1">
              <span className="text-sky-400 font-semibold text-[11px] bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/40">
                🟢 {locationStatus}
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Specialty Departments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-sky-400" />
              Browse by Specialty Department
            </h2>
            <p className="text-xs text-slate-400">Filter care providers by medical expertise</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {INITIAL_DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(selectedDepartment === dept.name ? 'ALL' : dept.name)}
              className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all ${
                selectedDepartment === dept.name
                  ? 'bg-sky-950/90 border-sky-500 text-sky-300 shadow-lg glow-sky'
                  : 'bg-slate-900/60 border-slate-800/90 text-slate-400 hover:border-slate-700 hover:text-slate-200 hover:-translate-y-1'
              }`}
            >
              <h4 className="font-bold text-xs sm:text-sm text-slate-100 mb-1">{dept.name}</h4>
              <p className="text-[10px] text-slate-400 line-clamp-2">{dept.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Verified Hospitals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-sky-400" />
              Verified Nearby Hospitals ({filteredHospitals.length})
            </h2>
            <p className="text-xs text-slate-400">Sorted by radial GPS proximity and user rating</p>
          </div>

          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="text-slate-400 font-medium">Min Rating:</span>
            {[0, 4, 4.5, 4.8].map((star) => (
              <button
                key={star}
                onClick={() => setMinRating(star)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all border ${
                  minRating === star
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
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
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-3">
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-400" />
              Live Interactive Map & Route Preview
            </h2>
            <p className="text-xs text-slate-400">Click any marker or navigate button to calculate route polylines</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span> Your GPS
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 ml-2"></span> 24/7 ER
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-2"></span> Specialty
            </div>

            <button
              onClick={() => router.push('/navigation')}
              className="text-xs font-bold text-sky-300 hover:text-white flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 px-3.5 py-1.5 rounded-lg shadow-lg shadow-sky-600/20 transition-all"
            >
              Launch Fullscreen Map
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="h-[360px] sm:h-[460px] lg:h-[550px] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl glow-sky">
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

      {/* Floating Emergency SOS Action Button */}
      <a
        href="tel:911"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-red-600 text-white font-extrabold shadow-2xl border-2 border-red-400 sos-button-animated flex items-center gap-2 text-xs hover:scale-110 transition-transform"
        title="Call 911 Emergency Hotline"
      >
        <PhoneCall className="w-5 h-5 text-white animate-bounce" />
        <span className="hidden sm:inline">EMERGENCY SOS</span>
      </a>

    </div>
  );
}
