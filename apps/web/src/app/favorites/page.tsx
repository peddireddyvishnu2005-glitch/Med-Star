'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import HospitalCard from '@/components/hospital/HospitalCard';
import { INITIAL_HOSPITALS } from '@/lib/mockData';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const router = useRouter();
  const { user } = useAuth();

  const favoriteHospitals = INITIAL_HOSPITALS.filter(
    (h) => user?.favorites.includes(h.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-current" />
          Saved Favorite Hospitals ({favoriteHospitals.length})
        </h1>
        <p className="text-xs text-slate-400">Quick-access list of your preferred medical care centers</p>
      </div>

      {favoriteHospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteHospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              onNavigate={() => router.push('/navigation')}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3 max-w-lg mx-auto">
          <Heart className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Favorite Hospitals Saved Yet</h3>
          <p className="text-xs text-slate-400">
            Click the heart icon on any hospital card to bookmark emergency centers or outpatient clinics for instant access.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl"
          >
            Browse Hospitals
          </button>
        </div>
      )}
    </div>
  );
}
