'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { INITIAL_HOSPITALS, INITIAL_DOCTORS, INITIAL_REVIEWS } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import { HospitalReview } from '@/types';
import { 
  MapPin, 
  AlertCircle, 
  Star, 
  Heart, 
  Navigation, 
  Stethoscope,
  MessageSquarePlus,
  ArrowLeft
} from 'lucide-react';

export default function HospitalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toggleFavorite, isFavorite, user } = useAuth();

  const hospitalId = params.id as string;
  const hospital = INITIAL_HOSPITALS.find((h) => h.id === hospitalId) || INITIAL_HOSPITALS[0];
  const doctors = INITIAL_DOCTORS.filter((d) => d.hospitalId === hospital.id);

  const [reviews, setReviews] = useState<HospitalReview[]>(INITIAL_REVIEWS.filter(r => r.hospitalId === hospital.id));
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'DOCTORS' | 'REVIEWS'>('OVERVIEW');

  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewComment, setNewReviewComment] = useState<string>('');

  const favorite = isFavorite(hospital.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const review: HospitalReview = {
      id: `rev-${Date.now()}`,
      hospitalId: hospital.id,
      userId: user?.uid || 'usr-guest',
      userName: user?.displayName || 'Anonymous Patient',
      rating: newReviewRating,
      comment: newReviewComment,
      createdAt: new Date().toISOString()
    };

    setReviews([review, ...reviews]);
    setNewReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Hospitals
      </button>

      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full">
          <Image
            src={hospital.images[0] || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80'}
            alt={hospital.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {hospital.hasEmergency && (
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                    <AlertCircle className="w-3.5 h-3.5" />
                    24/7 EMERGENCY DEPT
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-slate-900/80 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {hospital.rating} ({hospital.reviewCount} Reviews)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{hospital.name}</h1>
              <p className="text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-sky-400" />
                {hospital.address}, {hospital.city}, {hospital.state} {hospital.zip}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleFavorite(hospital.id)}
                className={`p-3 rounded-2xl border transition-all ${
                  favorite
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => router.push('/navigation')}
                className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold shadow-lg shadow-sky-600/30 flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Start Turn-by-Turn Navigation
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-800 gap-4 text-sm font-bold">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'OVERVIEW' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Overview & Departments
        </button>
        <button
          onClick={() => setActiveTab('DOCTORS')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'DOCTORS' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Doctor Roster ({doctors.length})
        </button>
        <button
          onClick={() => setActiveTab('REVIEWS')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'REVIEWS' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Patient Reviews ({reviews.length})
        </button>
      </div>

      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white">About the Medical Center</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {hospital.name} is a premier healthcare institution featuring state-of-the-art diagnostic imaging, round-the-clock emergency surgical care, intensive care units (ICU), and specialized outpatient clinics.
              </p>

              <h4 className="text-sm font-bold text-white pt-2">Specialized Departments & Services</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hospital.departments.map((dept) => (
                  <div key={dept} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                    <Stethoscope className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-semibold text-slate-200">{dept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-md font-bold text-white border-b border-slate-800 pb-2">Emergency & Contact Info</h3>

              {hospital.hasEmergency && (
                <div className="bg-red-950/40 border border-red-800/40 p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-red-400 uppercase">Live Emergency Hotline</span>
                  <a href={`tel:${hospital.emergencyPhone}`} className="block text-lg font-extrabold text-white hover:underline">
                    {hospital.emergencyPhone}
                  </a>
                </div>
              )}

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">General Contact:</span>
                  <span className="font-semibold text-slate-100">{hospital.phone}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Operating Hours:</span>
                  <span className="font-semibold text-emerald-400">{hospital.operatingHours}</span>
                </div>
                {hospital.hasEmergency && (
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">ICU Bed Availability:</span>
                    <span className="font-bold text-emerald-400">{hospital.availableEmergencyBeds} / {hospital.totalEmergencyBeds}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'DOCTORS' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-sky-500/40 shrink-0">
                  <Image src={doc.avatarUrl} alt={doc.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{doc.name}</h4>
                  <p className="text-xs text-sky-400 font-semibold">{doc.specialty}</p>
                  <p className="text-[11px] text-slate-400">{doc.experienceYears} Years Exp.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                <p><strong className="text-slate-200">Department:</strong> {doc.department}</p>
                <p><strong className="text-slate-200">Available:</strong> {doc.availableDays.join(', ')}</p>
              </div>

              <a
                href={`mailto:${doc.email}`}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl text-center transition-colors"
              >
                Contact Specialist
              </a>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'REVIEWS' && (
        <div className="space-y-6">
          <form onSubmit={handleAddReview} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 max-w-2xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquarePlus className="w-4 h-4 text-sky-400" />
              Write a Patient Review
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewReviewRating(star)}
                  className={`text-lg transition-transform ${star <= newReviewRating ? 'text-amber-400 scale-110' : 'text-slate-600'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
              placeholder="Share your experience regarding medical care, wait time, or facilities..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl"
            >
              Post Review
            </button>
          </form>

          <div className="space-y-4 max-w-3xl">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{rev.userName}</span>
                  <span className="text-amber-400 text-xs font-bold">{'★'.repeat(rev.rating)}</span>
                </div>
                <p className="text-xs text-slate-300">{rev.comment}</p>
                <span className="text-[10px] text-slate-500 block">{new Date(rev.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
