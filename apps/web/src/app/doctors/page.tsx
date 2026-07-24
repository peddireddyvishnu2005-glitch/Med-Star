'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Search, 
  Star, 
  Calendar, 
  Video, 
  Building2, 
  CheckCircle2, 
  DollarSign, 
  Languages, 
  Clock, 
  ShieldCheck,
  X
} from 'lucide-react';
import { Doctor } from '@/types';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('ALL');

  // Booking Modal state
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentType, setAppointmentType] = useState<'IN_PERSON' | 'VIDEO_CONSULTATION'>('IN_PERSON');
  const [bookingDate, setBookingDate] = useState('2026-07-28');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialty]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      let url = '/api/v1/doctors';
      if (selectedSpecialty !== 'ALL') {
        url += `?specialty=${encodeURIComponent(selectedSpecialty)}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) setDoctors(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    try {
      const res = await fetch('/api/v1/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          doctorName: selectedDoctor.name,
          doctorSpecialty: selectedDoctor.specialty,
          hospitalId: selectedDoctor.hospitalId,
          hospitalName: selectedDoctor.hospitalName || 'Metropolis General Hospital',
          type: appointmentType,
          date: bookingDate,
          timeSlot,
          notes,
          consultationFee: selectedDoctor.consultationFee,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          setBookingSuccess(false);
          setSelectedDoctor(null);
        }, 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40">
            VERIFIED SPECIALISTS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Find & Book Top Doctors</h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Schedule in-person clinic visits or instant HD video consultations with board-certified physicians.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto pt-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by doctor name, specialty, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-sky-300 font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="ALL">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Trauma">Trauma & Surgery</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading Doctors...</div>
        ) : filteredDoctors.length === 0 ? (
          <div className="py-20 text-center text-slate-400">No matching doctors found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-6 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={doc.avatarUrl}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="font-extrabold text-white text-lg">{doc.name}</h2>
                        {doc.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                        )}
                      </div>
                      <p className="text-xs text-sky-400 font-bold">{doc.specialty}</p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                        <Building2 className="w-3.5 h-3.5" /> {doc.hospitalName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Rating:
                      </span>
                      <strong className="text-slate-100">{doc.rating} ({doc.reviewCount} reviews)</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Experience:</span>
                      <strong className="text-slate-100">{doc.experienceYears} Years</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Languages className="w-3.5 h-3.5 text-sky-400" /> Languages:
                      </span>
                      <strong className="text-slate-100">{doc.languages.join(', ')}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Consultation Fee:
                      </span>
                      <strong className="text-emerald-400 font-extrabold">${doc.consultationFee}</strong>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setAppointmentType('IN_PERSON');
                    }}
                    className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" /> Book Visit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setAppointmentType('VIDEO_CONSULTATION');
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-4 h-4" /> Video Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white">Appointment Confirmed!</h3>
                <p className="text-xs text-slate-300">
                  Your appointment with <strong className="text-sky-300">{selectedDoctor.name}</strong> has been booked for {bookingDate} at {timeSlot}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Book Consultation</h2>
                  <p className="text-xs text-sky-400 font-semibold">{selectedDoctor.name} ({selectedDoctor.specialty})</p>
                </div>

                {/* Consultation Mode */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Consultation Type:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAppointmentType('IN_PERSON')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        appointmentType === 'IN_PERSON'
                          ? 'bg-sky-600 text-white border-sky-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <Calendar className="w-4 h-4" /> In-Person Visit
                    </button>
                    <button
                      type="button"
                      onClick={() => setAppointmentType('VIDEO_CONSULTATION')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        appointmentType === 'VIDEO_CONSULTATION'
                          ? 'bg-purple-600 text-white border-purple-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <Video className="w-4 h-4" /> Video Call
                    </button>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Date:</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Time Slot:</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-sky-300 font-bold focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="02:15 PM">02:15 PM</option>
                      <option value="04:45 PM">04:45 PM</option>
                    </select>
                  </div>
                </div>

                {/* Clinical Notes */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Reason for Visit / Symptoms:</label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your symptoms..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Consultation Fee:</span>
                  <strong className="text-emerald-400 text-sm font-extrabold">${selectedDoctor.consultationFee}</strong>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-sky-600/20 transition-all hover:scale-[1.02]"
                >
                  Confirm & Pay Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
