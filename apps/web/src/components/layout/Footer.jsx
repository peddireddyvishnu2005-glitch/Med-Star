import React from 'react';
import Link from 'next/link';
import { Building2, ShieldAlert, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">MedStart</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Enterprise Hospital Finder & Turn-by-Turn Navigation Platform. Empowering emergency response and patient care discovery worldwide.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/50 text-red-400 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            National Emergency Hotline: 911 / 112
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-sky-400 transition-colors">Hospital Discovery</Link></li>
            <li><Link href="/navigation" className="hover:text-sky-400 transition-colors">Live Routing Map</Link></li>
            <li><Link href="/favorites" className="hover:text-sky-400 transition-colors">Saved Favorites</Link></li>
            <li><Link href="/history" className="hover:text-sky-400 transition-colors">Navigation History</Link></li>
          </ul>
        </div>

        {/* Departments */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Specialties</h4>
          <ul className="space-y-2.5 text-sm">
            <li><span className="hover:text-slate-200">Emergency & Trauma</span></li>
            <li><span className="hover:text-slate-200">Cardiology & Vascular</span></li>
            <li><span className="hover:text-slate-200">Pediatric Care</span></li>
            <li><span className="hover:text-slate-200">Neurology & Neurosurgery</span></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support & Contact</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-400" />
              <span>+1 (800) 555-MEDSTART</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>support@medstart.org</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>Global Healthcare Network</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} MedStart Platform Inc. All rights reserved. Enterprise WCAG 2.2 AA Certified.</p>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="hover:text-slate-300">Documentation</Link>
          <Link href="/terms" className="hover:text-slate-300">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
