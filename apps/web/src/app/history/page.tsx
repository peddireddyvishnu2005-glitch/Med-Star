'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { RouteHistoryItem } from '@/types';
import { History, Trash2, Search, Download, MapPin, Clock, Route, CheckCircle2, Sparkles } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState<RouteHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medstart_route_history');
      if (saved && saved.trim() && saved !== 'undefined' && saved !== 'null') {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setHistory(parsed);
          }
        } catch (e) {
          console.error('Failed to parse navigation history:', e);
        }
      }
    }
  }, []);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all navigation route history logs?')) {
      localStorage.removeItem('medstart_route_history');
      setHistory([]);
    }
  };

  const handleExportHistory = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `medstart_navigation_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      item.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [history, searchQuery]);

  const totalDistance = history.reduce((acc, item) => acc + (item.distanceKm || 0), 0);
  const totalDuration = history.reduce((acc, item) => acc + (item.durationMins || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-sky-950/80 via-slate-900 to-slate-950 border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden glow-sky">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold">
            <History className="w-3.5 h-3.5 text-sky-400" />
            Telemetry & Route Dispatch Log
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Navigation Route History ({history.length})
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Verified turn-by-turn navigation sessions, emergency response logs, and route metrics
              </p>
            </div>

            {history.length > 0 && (
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={handleExportHistory}
                  className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition-all flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  Export JSON Log
                </button>
                <button
                  onClick={handleClearHistory}
                  className="px-3.5 py-2 rounded-2xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold border border-red-800/60 transition-all flex items-center gap-1.5 glow-red"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Log
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Sessions</p>
              <p className="text-lg font-extrabold text-white">{history.length} Routes</p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Distance</p>
              <p className="text-lg font-extrabold text-sky-400 flex items-center gap-1">
                <Route className="w-4 h-4 text-sky-400" />
                {totalDistance.toFixed(1)} km
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Travel Time</p>
              <p className="text-lg font-extrabold text-emerald-400 flex items-center gap-1">
                <Clock className="w-4 h-4 text-emerald-400" />
                {totalDuration} mins
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Status</p>
              <p className="text-lg font-extrabold text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                100% Synced
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      {history.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search navigation history logs by hospital name..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 backdrop-blur-md"
          />
        </div>
      )}

      {/* History Log List */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 p-4 sm:p-5 rounded-3xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg hover:-translate-y-0.5"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <h3 className="font-extrabold text-white text-base leading-tight">{item.hospitalName}</h3>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    GPS Start: ({item.startLat.toFixed(2)}, {item.startLng.toFixed(2)})
                  </span>
                  <span>•</span>
                  <span>Dest: ({item.destLat.toFixed(2)}, {item.destLng.toFixed(2)})</span>
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center">
                <div className="text-right">
                  <span className="font-extrabold text-sky-400 block text-sm">{item.distanceKm} km</span>
                  <span className="text-slate-400 text-[11px] font-medium">{item.durationMins} mins drive</span>
                </div>
                <span className="text-[10px] font-bold text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : history.length > 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-2">
          <Search className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Route Logs Match Search</h3>
          <p className="text-xs text-slate-400">Try clearing your search query filter.</p>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto glow-sky">
          <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-sky-400">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Route History Recorded</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            When you complete turn-by-turn directions to any hospital, your route metrics and ETA telemetry will automatically log here.
          </p>
        </div>
      )}

    </div>
  );
}
