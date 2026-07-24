'use client';

import React, { useState, useEffect } from 'react';
import { 
  GitCompare, 
  Building2, 
  Star, 
  CheckCircle2, 
  XCircle, 
  Bed, 
  HeartPulse, 
  Droplet, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Hospital, Doctor } from '@/types';

export default function ComparePage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [compareType, setCompareType] = useState<'hospitals' | 'doctors'>('hospitals');

  useEffect(() => {
    fetch('/api/v1/compare')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setHospitals(json.hospitals);
          setDoctors(json.doctors);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 border-b border-blue-900/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40">
            SIDE-BY-SIDE ANALYTICS ENGINE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Compare Hospitals & Specialists</h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Evaluate ER capacities, ICU bed availability, blood bank stock, consultation fees, and verified patient ratings.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setCompareType('hospitals')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                compareType === 'hospitals' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" /> Compare Hospitals ({hospitals.length})
            </button>
            <button
              onClick={() => setCompareType('doctors')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                compareType === 'doctors' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4" /> Compare Doctors ({doctors.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 overflow-x-auto">
        {compareType === 'hospitals' ? (
          <table className="w-full text-left border-collapse border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <thead>
              <tr className="bg-slate-900 text-slate-300 border-b border-slate-800 text-xs uppercase font-extrabold">
                <th className="p-4 border-r border-slate-800 w-48">Feature / Metric</th>
                {hospitals.map((h) => (
                  <th key={h.id} className="p-4 border-r border-slate-800 min-w-[240px] text-sky-400 text-sm">
                    {h.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              <tr>
                <td className="p-4 font-bold bg-slate-900/50 border-r border-slate-800">Overall Rating</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-4 border-r border-slate-800 font-extrabold text-amber-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400" /> {h.rating} ({h.reviewCount} reviews)
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold bg-slate-900/50 border-r border-slate-800">Available Emergency Beds</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-4 border-r border-slate-800 font-bold text-emerald-400">
                    {h.availableEmergencyBeds} / {h.totalEmergencyBeds} Available
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold bg-slate-900/50 border-r border-slate-800">Available ICU Beds</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-4 border-r border-slate-800 font-bold text-sky-400">
                    {h.availableIcuBeds} / {h.totalIcuBeds} ICU Units
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold bg-slate-900/50 border-r border-slate-800">Wheelchair Accessible</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-4 border-r border-slate-800">
                    {h.isWheelchairAccessible ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold"><CheckCircle2 className="w-4 h-4" /> Yes</span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1"><XCircle className="w-4 h-4" /> No</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold bg-slate-900/50 border-r border-slate-800">Insurance Accepted</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-4 border-r border-slate-800">
                    <div className="flex flex-wrap gap-1">
                      {h.insuranceAccepted.map((ins, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 text-[10px] font-bold border border-sky-800">
                          {ins}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left border-collapse border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <thead>
              <tr className="bg-slate-900 text-slate-300 border-b border-slate-800 text-xs uppercase font-extrabold">
                <th className="p-4 border-r border-slate-800 w-48">Physician Details</th>
                {doctors.map((d) => (
                  <th key={d.id} className="p-4 border-r border-slate-800 min-w-[240px] text-sky-400 text-sm">
                    {d.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              <tr>
                <td className="p-4 font-bold bg-slate-900/50 border-r border-slate-800">Specialty</td>
                {doctors.map((d) => (
                  <td key={d.id} className="p-4 border-r border-slate-800 font-bold text-slate-100">
                    {d.specialty}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-900/50 border-r border-slate-800">Consultation Fee</td>
                {doctors.map((d) => (
                  <td key={d.id} className="p-4 border-r border-slate-800 font-extrabold text-emerald-400 text-sm">
                    ${d.consultationFee}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-900/50 border-r border-slate-800">Experience</td>
                {doctors.map((d) => (
                  <td key={d.id} className="p-4 border-r border-slate-800 font-bold text-slate-200">
                    {d.experienceYears} Years
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold bg-slate-900/50 border-r border-slate-800">Languages</td>
                {doctors.map((d) => (
                  <td key={d.id} className="p-4 border-r border-slate-800 text-slate-300">
                    {d.languages.join(', ')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
