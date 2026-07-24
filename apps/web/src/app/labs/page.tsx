'use client';

import React, { useState, useEffect } from 'react';
import { 
  TestTube, 
  Clock, 
  Home, 
  Building, 
  CheckCircle2, 
  Download, 
  Calendar, 
  FileText,
  Sparkles
} from 'lucide-react';
import { LabTest, LabBooking } from '@/types';

export default function LabsPage() {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [bookings, setBookings] = useState<LabBooking[]>([]);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [collectionType, setCollectionType] = useState<'HOME_COLLECTION' | 'LAB_VISIT'>('HOME_COLLECTION');
  const [bookingDate, setBookingDate] = useState('2026-07-30');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/v1/labs')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setLabTests(json.tests);
          setBookings(json.bookings);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleBookTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) return;

    try {
      const res = await fetch('/api/v1/labs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labTestId: selectedTest.id,
          labTestName: selectedTest.name,
          bookingDate,
          sampleCollectionType: collectionType,
          price: selectedTest.price,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setBookingSuccess(true);
        setBookings((prev) => [json.data, ...prev]);
        setTimeout(() => {
          setBookingSuccess(false);
          setSelectedTest(null);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 border-b border-amber-900/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
            NABL ACCREDITED DIAGNOSTIC LABS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Diagnostic Testing & Reports</h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Book home sample collection or visit nearest diagnostic center with 100% accurate online PDF report access.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lab Tests List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Available Lab Panels</h2>
          <div className="space-y-4">
            {labTests.map((test) => (
              <div key={test.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-lg">{test.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      {test.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">{test.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> Turnaround: <strong>{test.turnaroundTime}</strong></span>
                    <span>Sample: <strong>{test.sampleType}</strong></span>
                    <span>Fasting: <strong className={test.fastingRequired ? 'text-amber-400' : 'text-slate-300'}>{test.fastingRequired ? 'Required (10-12 hrs)' : 'Not Required'}</strong></span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                  <span className="text-2xl font-extrabold text-amber-400">${test.price.toFixed(2)}</span>
                  <button
                    onClick={() => setSelectedTest(test)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20 transition-all"
                  >
                    Book Panel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings & Reports */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="font-extrabold text-white text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" /> My Diagnostic Bookings
            </h2>

            {bookings.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No diagnostic bookings logged yet.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((bk) => (
                  <div key={bk.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <strong className="text-white">{bk.labTestName}</strong>
                      <span className="text-emerald-400 font-bold">{bk.status}</span>
                    </div>
                    <p className="text-slate-400">Date: {bk.bookingDate} • {bk.sampleCollectionType}</p>
                    <button className="w-full py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-800/60 font-bold flex items-center justify-center gap-1.5 mt-2">
                      <Download className="w-3.5 h-3.5" /> Download Digital PDF Report
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedTest && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Book {selectedTest.name}</h3>

            {bookingSuccess ? (
              <div className="py-6 text-center text-emerald-400 font-bold text-sm">
                ✓ Diagnostic booking confirmed! Phlebotomist assigned.
              </div>
            ) : (
              <form onSubmit={handleBookTest} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Collection Preference:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCollectionType('HOME_COLLECTION')}
                      className={`py-2 rounded-xl text-xs font-bold border ${
                        collectionType === 'HOME_COLLECTION' ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      Home Collection
                    </button>
                    <button
                      type="button"
                      onClick={() => setCollectionType('LAB_VISIT')}
                      className={`py-2 rounded-xl text-xs font-bold border ${
                        collectionType === 'LAB_VISIT' ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      Visit Lab Center
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Date:</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-slate-400">Total Test Price:</span>
                  <span className="text-lg font-extrabold text-amber-400">${selectedTest.price.toFixed(2)}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTest(null)}
                    className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl bg-amber-600 text-white font-extrabold text-xs shadow-lg"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
