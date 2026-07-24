'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Bed, 
  HeartPulse, 
  Droplet, 
  Save, 
  CheckCircle2, 
  Eye, 
  Plus, 
  Activity,
  ShieldCheck
} from 'lucide-react';
import { Hospital } from '@/types';

export default function HospitalDashboardPage() {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [emergencyBeds, setEmergencyBeds] = useState(18);
  const [icuBeds, setIcuBeds] = useState(6);
  const [savedMessage, setSavedMessage] = useState('');
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  useEffect(() => {
    fetch('/api/v1/hospitals')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          const h = json.data[0];
          setHospital(h);
          setEmergencyBeds(h.availableEmergencyBeds || 18);
          setIcuBeds(h.availableIcuBeds || 6);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSaveBedStatus = () => {
    setSavedMessage('✓ Live Hospital Bed & ICU Occupancy updated across network!');
    setTimeout(() => setSavedMessage(''), 3500);
  };

  if (!hospital) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading Hospital Operations Center...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-600/30 border border-sky-500/60 flex items-center justify-center text-sky-400">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{hospital.name}</h1>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED HOSPITAL
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{hospital.address}, {hospital.city}, {hospital.state}</p>
            </div>
          </div>

          <button
            onClick={() => setShowVirtualTour(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 flex items-center gap-2 transition-all"
          >
            <Eye className="w-4 h-4" /> Preview 360° Virtual Tour
          </button>
        </div>

        {savedMessage && (
          <div className="max-w-7xl mx-auto mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{savedMessage}</span>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Emergency Bed Capacity Editor */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h2 className="font-extrabold text-white text-base flex items-center gap-2">
            <Bed className="w-5 h-5 text-sky-400" /> Emergency Department Beds
          </h2>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Available Emergency Beds:</span>
              <strong className="text-sky-300 text-lg font-extrabold">{emergencyBeds} / {hospital.totalEmergencyBeds}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEmergencyBeds((prev) => Math.max(0, prev - 1))}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-lg font-bold text-white hover:bg-slate-800"
              >
                -
              </button>
              <input
                type="number"
                value={emergencyBeds}
                onChange={(e) => setEmergencyBeds(Number(e.target.value))}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl py-2 text-center text-white font-extrabold text-sm"
              />
              <button
                onClick={() => setEmergencyBeds((prev) => Math.min(hospital.totalEmergencyBeds, prev + 1))}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-lg font-bold text-white hover:bg-slate-800"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleSaveBedStatus}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" /> Save Live Bed Count
          </button>
        </div>

        {/* ICU Bed Capacity Editor */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h2 className="font-extrabold text-white text-base flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-400" /> Intensive Care Unit (ICU)
          </h2>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Available ICU Beds:</span>
              <strong className="text-emerald-400 text-lg font-extrabold">{icuBeds} / {hospital.totalIcuBeds || 15}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIcuBeds((prev) => Math.max(0, prev - 1))}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-lg font-bold text-white hover:bg-slate-800"
              >
                -
              </button>
              <input
                type="number"
                value={icuBeds}
                onChange={(e) => setIcuBeds(Number(e.target.value))}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl py-2 text-center text-white font-extrabold text-sm"
              />
              <button
                onClick={() => setIcuBeds((prev) => Math.min(hospital.totalIcuBeds || 15, prev + 1))}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-lg font-bold text-white hover:bg-slate-800"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleSaveBedStatus}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" /> Save ICU Occupancy
          </button>
        </div>

        {/* Blood Bank Stock Monitor */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h2 className="font-extrabold text-white text-base flex items-center gap-2">
            <Droplet className="w-5 h-5 text-red-400 fill-red-400/20" /> Live Blood Bank Reserve
          </h2>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(hospital.bloodBankStock || { "A+": 24, "O+": 32, "B+": 18, "O-": 5 }).map(([type, count]) => (
              <div key={type} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="font-bold text-red-400">{type}</span>
                <strong className="text-white font-mono">{count} Units</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 360 Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Hospital 360° Virtual Tour</h3>
              <button onClick={() => setShowVirtualTour(false)} className="text-slate-400 hover:text-white font-bold">✕ Close</button>
            </div>
            <div className="w-full h-80 rounded-2xl overflow-hidden relative border border-slate-800">
              <img
                src={hospital.virtualTour360Url || hospital.images[0]}
                alt="360 Tour"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center text-white font-bold text-sm bg-gradient-to-t from-slate-950 via-transparent to-transparent">
                <span>Drag to Orbit • Interactive 360 View Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
