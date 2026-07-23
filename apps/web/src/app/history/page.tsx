'use client';

import React, { useState, useEffect } from 'react';
import { RouteHistoryItem } from '@/types';
import { History, MapPin, Clock, Navigation, Trash2 } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState<RouteHistoryItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medstart_route_history');
      if (saved) {
        try {
          setHistory(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('medstart_route_history');
    setHistory([]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-sky-400" />
            Navigation Route History ({history.length})
          </h1>
          <p className="text-xs text-slate-400">Past turn-by-turn navigation sessions and emergency routes</p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-semibold border border-red-800/60 flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Clear Log
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">{item.hospitalName}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span>📍 GPS Start: ({item.startLat.toFixed(2)}, {item.startLng.toFixed(2)})</span>
                  <span>•</span>
                  <span>🏥 Dest: ({item.destLat.toFixed(2)}, {item.destLng.toFixed(2)})</span>
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0">
                <div className="text-right">
                  <span className="font-bold text-sky-400 block">{item.distanceKm} km</span>
                  <span className="text-slate-500 text-[11px]">{item.durationMins} mins drive</span>
                </div>
                <span className="text-[10px] text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <History className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Navigation History Recorded</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            When you complete a turn-by-turn navigation session to any hospital, your route metrics will automatically be logged here.
          </p>
        </div>
      )}
    </div>
  );
}
