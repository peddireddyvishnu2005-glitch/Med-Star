'use client';

import React, { useState, useEffect } from 'react';
import { 
  Siren, 
  MapPin, 
  PhoneCall, 
  Clock, 
  ShieldAlert, 
  Building2, 
  CheckCircle2, 
  User, 
  Navigation,
  Droplet
} from 'lucide-react';
import { EmergencyRequest } from '@/types';
import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/map/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 bg-slate-900 animate-pulse rounded-2xl flex items-center justify-center text-slate-500 text-xs">
      Loading Live Emergency GPS Map...
    </div>
  ),
});

export default function EmergencySOSPage() {
  const [activeEmergency, setActiveEmergency] = useState<EmergencyRequest | null>(null);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 40.715,
    lng: -74.002,
  });

  useEffect(() => {
    fetch('/api/v1/emergency')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setActiveEmergency(json.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTriggerSOS = async () => {
    setSosTriggered(true);
    try {
      const res = await fetch('/api/v1/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: userLocation.lat,
          lng: userLocation.lng,
          address: "Live User GPS Location (350 5th Ave, NY)",
          severity: "CRITICAL",
          symptoms: ["Severe Trauma / Acute Distress"],
        }),
      });

      const json = await res.json();
      if (json.success) {
        setActiveEmergency(json.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-b border-red-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600/30 border border-red-500/60 flex items-center justify-center text-red-400 animate-pulse shrink-0">
              <Siren className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Emergency SOS Dispatch</h1>
                <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full animate-pulse">
                  24/7 ACTIVE
                </span>
              </div>
              <p className="text-xs text-red-200/80 mt-1">
                Instant 1-Tap Ambulance Dispatch with Real-Time GPS Tracking & Hospital ER Reservation.
              </p>
            </div>
          </div>

          <button
            onClick={handleTriggerSOS}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white font-extrabold text-lg shadow-2xl shadow-red-600/40 hover:scale-105 transition-all border border-red-400 flex items-center gap-3 animate-pulse"
          >
            <Siren className="w-6 h-6" />
            <span>TRIGGER 1-TAP SOS</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live GPS Map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-white text-base flex items-center gap-2">
                <Navigation className="w-5 h-5 text-sky-400" /> Live GPS Dispatch & Ambulance Tracking
              </h2>
              {activeEmergency && (
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-800">
                  STATUS: {activeEmergency.status}
                </span>
              )}
            </div>

            <InteractiveMap
              hospitals={[]}
              userLocation={userLocation}
              routeGeometry={
                activeEmergency && typeof activeEmergency.ambulanceLat === 'number' && typeof activeEmergency.ambulanceLng === 'number'
                  ? [
                      [userLocation.lat, userLocation.lng],
                      [activeEmergency.ambulanceLat, activeEmergency.ambulanceLng],
                    ]
                  : undefined
              }
            />
          </div>

          {/* Active Emergency Status Card */}
          {activeEmergency && (
            <div className="bg-slate-900/90 border border-red-900/60 p-6 rounded-3xl space-y-4 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Ambulance Dispatched
                  </h3>
                  <p className="text-xs text-slate-400">Assigned Hospital: <strong className="text-sky-300">{activeEmergency.assignedHospitalName}</strong></p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-red-400 font-mono">{activeEmergency.etaMins} MINS</span>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Estimated Arrival</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400">Driver & Paramedic:</span>
                  <p className="font-bold text-white text-sm">{activeEmergency.ambulanceDriverName}</p>
                  <p className="font-mono text-sky-400">{activeEmergency.ambulanceDriverPhone}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400">Call Driver Directly:</span>
                    <p className="text-xs text-slate-300">Continuous 2-way audio link</p>
                  </div>
                  <a
                    href={`tel:${activeEmergency.ambulanceDriverPhone}`}
                    className="p-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-all shadow-lg shadow-red-600/30"
                  >
                    <PhoneCall className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Emergency Medical Card & ER Hospital Capacity */}
        <div className="space-y-6">
          {/* Quick ER Medical Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" /> Emergency Triage Card
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Patient Name:</span>
                <strong className="text-slate-100">Alexander Wright</strong>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Blood Group:</span>
                <strong className="text-red-400 font-extrabold flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 fill-red-400" /> O+ (Universal Donor)
                </strong>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Critical Allergies:</span>
                <strong className="text-red-300">Penicillin, Peanuts</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Primary ER Contact:</span>
                <strong className="text-sky-300">Sarah Wright (+1 555 987-6543)</strong>
              </div>
            </div>
          </div>

          {/* Nearest ER Capacities */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="font-extrabold text-white text-base flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-400" /> Live ER Capacity Matrix
            </h3>

            <div className="space-y-3">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">Metropolis General Hospital</h4>
                  <p className="text-[11px] text-slate-400">1.2 km away • 4 mins ETA</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-emerald-400 text-sm">18 / 25 Beds</span>
                  <p className="text-[10px] text-emerald-400">ER Ready</p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">Apex Trauma Center</h4>
                  <p className="text-[11px] text-slate-400">3.8 km away • 9 mins ETA</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-amber-400 text-sm">12 / 20 Beds</span>
                  <p className="text-[10px] text-amber-400">Busy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
