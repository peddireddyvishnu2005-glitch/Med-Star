'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  CornerUpRight, 
  CornerUpLeft, 
  CheckCircle2, 
  PhoneCall, 
  X 
} from 'lucide-react';

export default function NavigationDrawer({
  hospital,
  routeInfo,
  onClose,
  onCompleteNavigation
}) {
  const [routeMode, setRouteMode] = useState('FASTEST');

  const renderStepIcon = (iconType) => {
    switch (iconType) {
      case 'turn-right':
        return <CornerUpRight className="w-5 h-5 text-sky-400 shrink-0" />;
      case 'turn-left':
        return <CornerUpLeft className="w-5 h-5 text-sky-400 shrink-0" />;
      case 'destination':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      default:
        return <ArrowUpRight className="w-5 h-5 text-sky-400 shrink-0" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 max-w-md w-full">

      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800/40">
            Live Navigation Active
          </span>
          <h3 className="text-lg font-bold text-white mt-1 leading-tight">{hospital.name}</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            {hospital.address}, {hospital.city}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Metrics & Mode Toggle */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <p className="text-[11px] text-slate-400 font-medium">Distance</p>
          <p className="text-xl font-extrabold text-sky-400">{routeInfo.distanceKm} km</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <p className="text-[11px] text-slate-400 font-medium">Est. Drive Time</p>
          <p className="text-xl font-extrabold text-emerald-400 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {routeMode === 'FASTEST' ? routeInfo.durationMins : routeInfo.durationMins + 2} mins
          </p>
        </div>
      </div>

      {/* Route Preference Buttons */}
      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 text-xs font-semibold">
        <button
          onClick={() => setRouteMode('FASTEST')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            routeMode === 'FASTEST'
              ? 'bg-sky-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ⚡ Fastest Route
        </button>
        <button
          onClick={() => setRouteMode('SHORTEST')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            routeMode === 'SHORTEST'
              ? 'bg-sky-600 text-white shadow'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📏 Shortest Path
        </button>
      </div>

      {/* Turn-by-Turn Instruction List */}
      <div>
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Turn-by-Turn Instructions</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {routeInfo.steps.map((step, idx) => (
            <div key={idx} className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex items-start gap-3">
              {renderStepIcon(step.icon)}
              <div className="flex-1 text-xs">
                <p className="font-semibold text-slate-200">{step.instruction}</p>
                <span className="text-[11px] text-slate-500">{step.distance} • {step.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
        <a
          href={`tel:${hospital.emergencyPhone}`}
          className="py-2.5 px-3 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-800/60 text-red-300 text-xs font-bold flex items-center gap-1.5"
        >
          <PhoneCall className="w-4 h-4 text-red-400" />
          Call ER
        </a>
        <button
          onClick={onCompleteNavigation}
          className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          Arrived & Save Log
        </button>
      </div>

    </div>
  );
}
