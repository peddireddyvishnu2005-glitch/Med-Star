'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { INITIAL_HOSPITALS, INITIAL_DOCTORS, INITIAL_AUDIT_LOGS } from '@/lib/mockData';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Bell, 
  FileText, 
  CheckCircle2, 
  Lock
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { role, user } = useAuth();
  
  const [hospitals, setHospitals] = useState(INITIAL_HOSPITALS);
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  const [activeTab, setActiveTab] = useState('HOSPITALS');
  const [statusMessage, setStatusMessage] = useState(null);

  // New Hospital Form State
  const [newHospName, setNewHospName] = useState('');
  const [newHospCity, setNewHospCity] = useState('Metropolis');
  const [newHospBeds, setNewHospBeds] = useState(15);
  const [newHospEmergency, setNewHospEmergency] = useState(true);

  // Push Notification state
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');

  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4 shadow-2xl">
        <Lock className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Access Restricted — RBAC Admin Required</h2>
        <p className="text-xs text-slate-400">
          You currently have <strong>{role}</strong> access. Use the top navigation role switcher to select <strong>Admin</strong> or <strong>Super Admin</strong>.
        </p>
      </div>
    );
  }

  const handleAddHospital = (e) => {
    e.preventDefault();
    if (!newHospName.trim()) return;

    const newHosp = {
      id: `hosp-${Date.now()}`,
      name: newHospName,
      slug: newHospName.toLowerCase().replace(/\s+/g, '-'),
      address: '100 Healthcare Way',
      city: newHospCity,
      state: 'NY',
      zip: '10001',
      phone: '+1 (555) 000-1111',
      emergencyPhone: '+1 (555) 911-0000',
      hasEmergency: newHospEmergency,
      availableEmergencyBeds: newHospBeds,
      totalEmergencyBeds: newHospBeds + 5,
      lat: 40.7128 + (Math.random() * 0.05 - 0.025),
      lng: -74.0060 + (Math.random() * 0.05 - 0.025),
      rating: 5.0,
      reviewCount: 1,
      images: ['https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80'],
      departments: ['Emergency & Trauma', 'Cardiology'],
      operatingHours: '24/7 Open',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setHospitals([...hospitals, newHosp]);

    // Log Audit
    const log = {
      id: `audit-${Date.now()}`,
      action: 'CREATE_HOSPITAL',
      performedBy: user?.email || 'admin@medstart.org',
      targetId: newHosp.id,
      details: `Created new hospital record: ${newHosp.name}`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs([log, ...auditLogs]);

    setNewHospName('');
    setStatusMessage(`Hospital "${newHosp.name}" created successfully!`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDeleteHospital = (id) => {
    const hosp = hospitals.find(h => h.id === id);
    setHospitals(hospitals.filter(h => h.id !== id));

    const log = {
      id: `audit-${Date.now()}`,
      action: 'DELETE_HOSPITAL',
      performedBy: user?.email || 'admin@medstart.org',
      targetId: id,
      details: `Soft deleted hospital record: ${hosp?.name}`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs([log, ...auditLogs]);
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifBody.trim()) return;

    setStatusMessage(`FCM Push Notification "${notifTitle}" broadcasted to all active regional app instances!`);
    setTimeout(() => setStatusMessage(null), 4000);

    setNotifTitle('');
    setNotifBody('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border border-emerald-500/20">
              RBAC {role} Active
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Enterprise Admin Portal
          </h1>
          <p className="text-xs text-slate-400">Manage hospitals, doctor rosters, ICU bed capacity, FCM alerts, and audit logs.</p>
        </div>
      </div>

      {statusMessage && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {statusMessage}
        </div>
      )}

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold">Total Hospitals</p>
          <p className="text-2xl font-extrabold text-white mt-1">{hospitals.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold">Total Active Specialists</p>
          <p className="text-2xl font-extrabold text-sky-400 mt-1">{doctors.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold">Available Emergency Beds</p>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">
            {hospitals.reduce((acc, h) => acc + h.availableEmergencyBeds, 0)}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400 font-semibold">Audit Stream Logs</p>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">{auditLogs.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('HOSPITALS')}
          className={`pb-3 border-b-2 ${activeTab === 'HOSPITALS' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400'}`}
        >
          Hospital Management ({hospitals.length})
        </button>
        <button
          onClick={() => setActiveTab('DOCTORS')}
          className={`pb-3 border-b-2 ${activeTab === 'DOCTORS' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400'}`}
        >
          Doctor Rosters ({doctors.length})
        </button>
        <button
          onClick={() => setActiveTab('NOTIFICATIONS')}
          className={`pb-3 border-b-2 ${activeTab === 'NOTIFICATIONS' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400'}`}
        >
          FCM Broadcast Notifications
        </button>
        <button
          onClick={() => setActiveTab('AUDIT')}
          className={`pb-3 border-b-2 ${activeTab === 'AUDIT' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400'}`}
        >
          System Audit Logs ({auditLogs.length})
        </button>
      </div>

      {/* Tab 1: Hospital Management */}
      {activeTab === 'HOSPITALS' && (
        <div className="space-y-6">
          {/* Add Hospital Form */}
          <form onSubmit={handleAddHospital} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-sky-400" />
              Register New Hospital Record
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newHospName}
                onChange={(e) => setNewHospName(e.target.value)}
                placeholder="Hospital Name (e.g. St. Thomas Memorial)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                required
              />
              <select
                value={newHospCity}
                onChange={(e) => setNewHospCity(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="Metropolis">Metropolis</option>
                <option value="Brooklyn">Brooklyn</option>
                <option value="Queens">Queens</option>
              </select>
              <input
                type="number"
                value={newHospBeds}
                onChange={(e) => setNewHospBeds(Number(e.target.value))}
                placeholder="Initial Emergency Bed Count"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl"
            >
              Add Hospital Record
            </button>
          </form>

          {/* Hospitals Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Hospital</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Emergency Status</th>
                  <th className="p-3">ICU Beds</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {hospitals.map((hosp) => (
                  <tr key={hosp.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-white">{hosp.name}</td>
                    <td className="p-3 text-slate-400">{hosp.city}, {hosp.state}</td>
                    <td className="p-3">
                      {hosp.hasEmergency ? (
                        <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          Active 24/7
                        </span>
                      ) : (
                        <span className="text-slate-500 font-medium">Outpatient</span>
                      )}
                    </td>
                    <td className="p-3 font-semibold text-sky-400">{hosp.availableEmergencyBeds} available</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteHospital(hosp.id)}
                        className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60"
                        title="Delete Hospital"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Doctor Rosters */}
      {activeTab === 'DOCTORS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">Active Specialist Doctor Rosters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">{doc.name}</h4>
                <p className="text-xs text-sky-400">{doc.specialty}</p>
                <p className="text-[11px] text-slate-400">{doc.department} • {doc.experienceYears} Yrs Exp.</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: FCM Broadcast Notifications */}
      {activeTab === 'NOTIFICATIONS' && (
        <form onSubmit={handleSendNotification} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 max-w-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-400" />
            Dispatch FCM Regional Emergency Notification
          </h3>
          <input
            type="text"
            value={notifTitle}
            onChange={(e) => setNotifTitle(e.target.value)}
            placeholder="Alert Title (e.g. Regional ICU Bed Capacity Warning)"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            required
          />
          <textarea
            value={notifBody}
            onChange={(e) => setNotifBody(e.target.value)}
            placeholder="Notification message body..."
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
          >
            Broadcast Push Alert
          </button>
        </form>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'AUDIT' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            Real-Time System Audit Stream
          </h3>
          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-sky-400 mr-2">[{log.action}]</span>
                  <span className="text-slate-300">{log.details}</span>
                  <p className="text-[10px] text-slate-500">Performed by: {log.performedBy}</p>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
