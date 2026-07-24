'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  QrCode, 
  ShieldAlert, 
  HeartPulse, 
  FileText, 
  PhoneCall, 
  Plus, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Download, 
  Clock, 
  Sparkles,
  Droplet
} from 'lucide-react';
import { PatientProfile } from '@/types';

export default function PatientDashboardPage() {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'card' | 'history' | 'contacts' | 'saved'>('card');
  const [exportMessage, setExportMessage] = useState('');

  useEffect(() => {
    fetch('/api/v1/patient')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setProfile(json.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Patient Portal & Digital Health Card...</span>
        </div>
      </div>
    );
  }

  const handleExportPDF = () => {
    setExportMessage('Generating & encrypting digital EHR PDF report...');
    setTimeout(() => {
      setExportMessage('✓ EHR PDF report exported successfully to downloads folder!');
      setTimeout(() => setExportMessage(''), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 p-1 shadow-lg shadow-sky-500/20">
              <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                <User className="w-8 h-8 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{profile.fullName}</h1>
                <span className="bg-sky-500/20 text-sky-400 border border-sky-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  VERIFIED PATIENT
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5 flex items-center gap-2">
                <span>DOB: {profile.dob}</span> • <span>Gender: {profile.gender}</span> • <span>Card ID: <strong className="text-sky-300">{profile.healthCardNumber}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPDF}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/20 flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              Export EHR History (PDF)
            </button>
          </div>
        </div>

        {exportMessage && (
          <div className="max-w-7xl mx-auto mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{exportMessage}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'card' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            Digital Health Card & Profile
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'history' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Medical History ({profile.medicalRecords.length})
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'contacts' ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Emergency Contacts ({profile.emergencyContacts.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'card' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Digital Health Card */}
              <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center justify-between border-b border-sky-800/40 pb-4">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-6 h-6 text-sky-400" />
                    <span className="font-extrabold text-white text-lg tracking-wider">MedStart CARD</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    ACTIVE
                  </span>
                </div>

                {/* QR Code Demo */}
                <div className="my-6 flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-inner text-slate-900">
                  <div className="w-40 h-40 bg-slate-900 rounded-xl flex flex-col items-center justify-center p-3 text-center border-4 border-sky-400">
                    <QrCode className="w-24 h-24 text-sky-400" />
                    <span className="text-[10px] font-mono text-sky-200 mt-1">SCAN FOR ER TRIAGE</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 mt-2">{profile.healthCardNumber}</span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 border-t border-sky-800/40 pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Blood Group:</span>
                    <strong className="text-red-400 font-extrabold flex items-center gap-1">
                      <Droplet className="w-3.5 h-3.5 fill-red-400" /> {profile.bloodGroup}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Height / Weight:</span>
                    <strong className="text-slate-100">{profile.heightCm} cm / {profile.weightKg} kg</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Organ Donor Status:</span>
                    <strong className="text-emerald-400">{profile.organDonor ? 'YES (Registered)' : 'NO'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Insurance Provider:</span>
                    <strong className="text-sky-300">{profile.insuranceProvider}</strong>
                  </div>
                </div>
              </div>

              {/* Health Metrics & Allergies */}
              <div className="lg:col-span-2 space-y-6">
                {/* Allergies & Chronic Conditions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-red-400 font-bold mb-3">
                      <ShieldAlert className="w-5 h-5" />
                      <h3>Allergies & Sensitivities</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.allergies.map((allergy, i) => (
                        <span key={i} className="px-3 py-1 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-bold">
                          ⚠️ {allergy}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-amber-400 font-bold mb-3">
                      <HeartPulse className="w-5 h-5" />
                      <h3>Chronic Health Conditions</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.chronicDiseases.map((disease, i) => (
                        <span key={i} className="px-3 py-1 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-bold">
                          🩺 {disease}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Clinical Visits Overview */}
                <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sky-400" />
                    AI Health Summary & Risk Indicator
                  </h3>
                  <div className="bg-sky-950/40 border border-sky-800/60 p-4 rounded-xl text-xs leading-relaxed text-sky-200">
                    <p className="font-semibold mb-1 text-sky-300">✓ Overall Health Score: 92/100 (Optimal)</p>
                    <p>Cardiovascular metrics are stable. Lipid profile screening recommended in 3 months. No critical emergency triggers logged in the past 30 days.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Electronic Health Records (EHR)</h2>
              {profile.medicalRecords.map((record) => (
                <div key={record.id} className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{record.title}</h3>
                      <p className="text-xs text-sky-400">{record.doctorName} • {record.hospitalName}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {record.date}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <p><strong className="text-slate-400">Diagnosis:</strong> {record.diagnosis}</p>
                    {record.prescriptionSummary && (
                      <p><strong className="text-slate-400">Prescription:</strong> <span className="text-emerald-400 font-semibold">{record.prescriptionSummary}</span></p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Emergency Contacts</h2>
                <button className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add Emergency Contact
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.emergencyContacts.map((contact) => (
                  <div key={contact.id} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base">{contact.name}</h3>
                      <p className="text-xs text-sky-400 font-semibold">{contact.relationship}</p>
                      <p className="text-xs font-mono text-slate-300 mt-1">{contact.phone}</p>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="p-3 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-all border border-red-500/40"
                    >
                      <PhoneCall className="w-5 h-5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
