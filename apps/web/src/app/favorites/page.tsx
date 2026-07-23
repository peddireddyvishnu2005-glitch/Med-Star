'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import HospitalCard from '@/components/hospital/HospitalCard';
import { INITIAL_HOSPITALS } from '@/lib/mockData';
import { Heart, Search, Activity, AlertCircle, ArrowUpDown, Sparkles, Building2 } from 'lucide-react';

export default function FavoritesPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [emergencyOnlyFilter, setEmergencyOnlyFilter] = useState(false);
  const [sortBy, setSortBy] = useState<'RATING' | 'BEDS' | 'NAME'>('RATING');

  const rawFavorites = useMemo(() => {
    return INITIAL_HOSPITALS.filter((h) => user?.favorites.includes(h.id));
  }, [user]);

  const filteredFavorites = useMemo(() => {
    return rawFavorites
      .filter((h) => {
        const matchesSearch =
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.departments.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesEmergency = !emergencyOnlyFilter || h.hasEmergency;
        return matchesSearch && matchesEmergency;
      })
      .sort((a, b) => {
        if (sortBy === 'RATING') return b.rating - a.rating;
        if (sortBy === 'BEDS') return b.availableEmergencyBeds - a.availableEmergencyBeds;
        return a.name.localeCompare(b.name);
      });
  }, [rawFavorites, searchQuery, emergencyOnlyFilter, sortBy]);

  const totalIcuBeds = rawFavorites.reduce((acc, h) => acc + h.availableEmergencyBeds, 0);
  const emergencyCentersCount = rawFavorites.filter((h) => h.hasEmergency).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-sky-950/80 via-slate-900 to-slate-950 border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden glow-sky">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
            Bookmarked Emergency Care Centers
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Saved Favorite Hospitals ({rawFavorites.length})
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Instant 1-tap route calculation and emergency hotline access for your preferred medical centers
              </p>
            </div>

            <button
              onClick={() => router.push('/')}
              className="self-start sm:self-auto px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg shadow-sky-600/20 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Discover More Hospitals
            </button>
          </div>

          {/* Quick Metrics Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Saved</p>
              <p className="text-lg font-extrabold text-white">{rawFavorites.length} Centers</p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">ICU Beds Ready</p>
              <p className="text-lg font-extrabold text-emerald-400 flex items-center gap-1">
                <Activity className="w-4 h-4 text-emerald-400" />
                {totalIcuBeds} Beds
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">24/7 Emergency</p>
              <p className="text-lg font-extrabold text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-red-400" />
                {emergencyCentersCount} Ready
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Avg Rating</p>
              <p className="text-lg font-extrabold text-amber-400">
                {rawFavorites.length > 0
                  ? (rawFavorites.reduce((acc, h) => acc + h.rating, 0) / rawFavorites.length).toFixed(1)
                  : '0.0'} ★
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Sort */}
      {rawFavorites.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl backdrop-blur-md">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved hospitals by name or department..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 text-xs font-semibold">
            <button
              onClick={() => setEmergencyOnlyFilter(!emergencyOnlyFilter)}
              className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                emergencyOnlyFilter
                  ? 'bg-red-600 text-white border-red-500 shadow-md glow-red'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              24/7 ER Only
            </button>

            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-sky-400 font-bold focus:outline-none cursor-pointer"
              >
                <option value="RATING" className="bg-slate-950 text-slate-200">Highest Rating</option>
                <option value="BEDS" className="bg-slate-950 text-slate-200">Most ICU Beds</option>
                <option value="NAME" className="bg-slate-950 text-slate-200">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Favorites List Grid */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              onNavigate={() => router.push('/navigation')}
            />
          ))}
        </div>
      ) : rawFavorites.length > 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <Search className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Saved Hospitals Match Filter</h3>
          <p className="text-xs text-slate-400">Try clearing your search query or emergency filter.</p>
          <button
            onClick={() => { setSearchQuery(''); setEmergencyOnlyFilter(false); }}
            className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto glow-sky">
          <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-red-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Favorite Hospitals Saved Yet</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bookmark emergency trauma centers, specialized cardiothoracic units, or outpatient clinics by clicking the heart icon on any hospital card.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold rounded-2xl shadow-lg shadow-sky-600/20 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Explore Hospitals Directory
          </button>
        </div>
      )}
    </div>
  );
}
