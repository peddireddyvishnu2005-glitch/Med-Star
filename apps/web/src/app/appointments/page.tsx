'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  UserCheck, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { Appointment } from '@/types';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/appointments')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setAppointments(json.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCancelAppointment = async (id: string) => {
    try {
      const res = await fetch('/api/v1/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'CANCELLED' }),
      });

      const json = await res.json();
      if (json.success) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: 'CANCELLED' } : a))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              REAL-TIME QUEUE & TELEMEDICINE
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Appointments Calendar</h1>
            <p className="text-sm text-slate-400">
              Track upcoming doctor visits, live waiting queue positions, and launch video consultations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading Appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="py-20 text-center text-slate-400">No appointments scheduled.</div>
        ) : (
          <div className="space-y-4">
            {appointments.map((app) => (
              <div
                key={app.id}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                        app.status === 'CONFIRMED'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : app.status === 'CANCELLED'
                          ? 'bg-red-500/20 text-red-400 border-red-500/40'
                          : 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                      }`}
                    >
                      {app.status}
                    </span>

                    <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-sky-400" /> {app.date} at {app.timeSlot}
                    </span>

                    {app.queueNumber && (
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-800">
                        Queue Token: #{app.queueNumber}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-sky-400" /> {app.doctorName}
                    </h2>
                    <p className="text-xs text-sky-300 font-semibold">{app.doctorSpecialty} • {app.hospitalName}</p>
                  </div>

                  {app.notes && (
                    <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <strong className="text-slate-300">Notes:</strong> {app.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
                  {app.type === 'VIDEO_CONSULTATION' && app.status !== 'CANCELLED' && (
                    <a
                      href={app.meetingLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all"
                    >
                      <Video className="w-4 h-4" /> Launch Video Room
                    </a>
                  )}

                  {app.status !== 'CANCELLED' && (
                    <button
                      onClick={() => handleCancelAppointment(app.id)}
                      className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 text-xs font-bold transition-all"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
