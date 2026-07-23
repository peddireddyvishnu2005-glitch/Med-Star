import React, { useState } from 'react';
import { Hospital, RouteInfo } from '@/types';
import { 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  CornerUpRight, 
  CornerUpLeft, 
  CheckCircle2, 
  PhoneCall, 
  X,
  Volume2,
  AlertTriangle
} from 'lucide-react';

interface NavigationDrawerProps {
  hospital: Hospital;
  routeInfo: RouteInfo;
  onClose: () => void;
  onCompleteNavigation: () => void;
}

export default function NavigationDrawer({
  hospital,
  routeInfo,
  onClose,
  onCompleteNavigation
}: NavigationDrawerProps) {
  const [routeMode, setRouteMode] = useState<'FASTEST' | 'SHORTEST' | 'EMERGENCY'>('FASTEST');

  const renderStepIcon = (iconType: string) => {
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

  const currentDuration = routeMode === 'EMERGENCY'
    ? Math.max(1, routeInfo.durationMins - 1)
    : routeMode === 'FASTEST'
    ? routeInfo.durationMins
    : routeInfo.durationMins + 2;

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 max-w-md w-full glow-sky">

      <div className="flex items-start justify-between border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-800/60 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Live Routing Active
            </span>
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
              <Volume2 className="w-3 h-3 text-sky-400" /> Voice On
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-white leading-tight">{hospital.name}</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{hospital.address}, {hospital.city}</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
          <p className="text-[11px] text-slate-400 font-medium">Distance</p>
          <p className="text-xl font-extrabold text-sky-400">{routeInfo.distanceKm} km</p>
        </div>
        <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
          <p className="text-[11px] text-slate-400 font-medium">Est. Drive Time</p>
          <p className="text-xl font-extrabold text-emerald-400 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {currentDuration} mins
          </p>
        </div>
      </div>

      <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 gap-1 text-xs font-bold">
        <button
          onClick={() => setRouteMode('FASTEST')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            routeMode === 'FASTEST'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ⚡ Fastest
        </button>
        <button
          onClick={() => setRouteMode('SHORTEST')}
          className={`flex-1 py-1.5 rounded-xl transition-all ${
            routeMode === 'SHORTEST'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📏 Shortest
        </button>
        <button
          onClick={() => setRouteMode('EMERGENCY')}
          className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1 ${
            routeMode === 'EMERGENCY'
              ? 'bg-red-600 text-white shadow-md glow-red'
              : 'text-red-400 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-3 h-3" />
          🚑 ER
        </button>
      </div>

      <div>
        <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Turn-by-Turn GPS Guidance</span>
          <span className="text-sky-400 lowercase">{routeInfo.steps.length} steps</span>
        </h4>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {routeInfo.steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border flex items-start gap-3 transition-all ${
                idx === 0
                  ? 'bg-sky-950/60 border-sky-500/50 text-white shadow-md'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
              }`}
            >
              {renderStepIcon(step.icon)}
              <div className="flex-1 text-xs">
                <p className="font-bold text-slate-100">{step.instruction}</p>
                <span className="text-[11px] text-slate-400 font-medium">{step.distance} • {step.duration}</span>
              </div>
              {idx === 0 && (
                <span className="text-[9px] font-extrabold bg-sky-500 text-slate-950 px-1.5 py-0.5 rounded">
                  NEXT
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
        <a
          href={`tel:${hospital.emergencyPhone}`}
          className="py-2.5 px-3.5 rounded-2xl bg-red-950/70 hover:bg-red-900 border border-red-800/80 text-red-300 text-xs font-bold transition-all flex items-center gap-1.5 glow-red"
        >
          <PhoneCall className="w-4 h-4 text-red-400 animate-pulse" />
          Call ER
        </a>
        <button
          onClick={onCompleteNavigation}
          className="flex-1 py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          Arrived & Log Session
        </button>
      </div>

    </div>
  );
}
