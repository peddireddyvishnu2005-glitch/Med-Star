'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hospital } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { 
  MapPin, 
  Heart, 
  Navigation, 
  Star, 
  AlertCircle, 
  Bed 
} from 'lucide-react';

interface HospitalCardProps {
  hospital: Hospital;
  onNavigate: (hosp: Hospital) => void;
}

export default function HospitalCard({ hospital, onNavigate }: HospitalCardProps) {
  const { toggleFavorite, isFavorite } = useAuth();
  const favorite = isFavorite(hospital.id);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 group flex flex-col">

      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <Image
          src={hospital.images[0] || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'}
          alt={hospital.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(hospital.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
            favorite
              ? 'bg-red-500/20 text-red-500 border border-red-500/40 shadow-lg'
              : 'bg-slate-950/60 text-slate-300 hover:text-white border border-white/10'
          }`}
          title={favorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>

        {hospital.hasEmergency ? (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
            <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
            24/7 EMERGENCY OPEN
          </div>
        ) : (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-800/90 text-slate-300 text-xs font-medium backdrop-blur-sm">
            Outpatient Specialty
          </div>
        )}

        {hospital.distanceKm !== undefined && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-bold flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {hospital.distanceKm} km away
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors leading-tight line-clamp-1">
              {hospital.name}
            </h3>
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-amber-400 text-xs font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              {hospital.rating} ({hospital.reviewCount})
            </div>
          </div>

          <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{hospital.address}, {hospital.city}</span>
          </p>

          {hospital.hasEmergency && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-xs mb-3">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Bed className="w-4 h-4 text-emerald-400" />
                <span>Available Emergency Beds:</span>
              </div>
              <span className="font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                {hospital.availableEmergencyBeds} / {hospital.totalEmergencyBeds}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {hospital.departments.slice(0, 3).map((dept) => (
              <span
                key={dept}
                className="text-[11px] font-medium bg-slate-800/80 text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-700/50"
              >
                {dept}
              </span>
            ))}
            {hospital.departments.length > 3 && (
              <span className="text-[11px] font-medium text-slate-500 self-center">
                +{hospital.departments.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
          <Link
            href={`/hospitals/${hospital.id}`}
            className="flex-1 text-center py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => onNavigate(hospital)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            Navigate
          </button>
        </div>
      </div>

    </div>
  );
}
