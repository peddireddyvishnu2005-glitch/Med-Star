'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MedStarIcon } from '@/components/ui/MedStarIcon';
import { 
  Building2, 
  MapPin, 
  Heart, 
  History, 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  Menu, 
  X,
  Stethoscope,
  User,
  UserCheck,
  Siren,
  Bot,
  Pill,
  TestTube,
  GitCompare,
  Calendar,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserRole } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, loginAs, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path || (path !== '/' && pathname.startsWith(path));

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <MedStarIcon size="md" glow={true} className="group-hover:scale-105 transition-transform" />
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent tracking-tight">
                MedStart
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                PRO V2
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 shrink-0">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                pathname === '/' 
                  ? 'bg-sky-600/20 text-sky-400 border border-sky-500/40 shadow-sm shadow-sky-500/10' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Hospitals</span>
            </Link>

            <Link
              href="/navigation"
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/navigation') 
                  ? 'bg-sky-600/20 text-sky-400 border border-sky-500/40 shadow-sm shadow-sky-500/10' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>Live Map</span>
            </Link>

            <Link
              href="/specialties"
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/specialties') 
                  ? 'bg-sky-600/20 text-sky-400 border border-sky-500/40 shadow-sm shadow-sky-500/10' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>Specialties</span>
            </Link>

            {/* Healthcare Hub Mega Dropdown */}
            <div 
              className="relative group" 
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                suppressHydrationWarning
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 border ${
                  dropdownOpen || isActive('/patient') || isActive('/doctors') || isActive('/appointments') || isActive('/ai-assistant') || isActive('/pharmacy') || isActive('/labs') || isActive('/compare') || isActive('/hospital/dashboard')
                    ? 'bg-sky-600/20 text-sky-300 border-sky-500/40 shadow-lg shadow-sky-500/10'
                    : 'bg-slate-900/60 text-slate-200 border-slate-800 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Healthcare Hub</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {dropdownOpen && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[600px] sm:w-[680px] z-50 animate-in fade-in duration-100"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="bg-slate-950/98 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl grid grid-cols-3 gap-4">
                  {/* Column 1: Patient & Doctors */}
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-sky-400 border-b border-slate-800 pb-1">
                      Clinical Care
                    </p>
                    <Link
                      href="/patient/dashboard"
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-900/90 transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-sky-300">Patient Dashboard</h4>
                        <p className="text-[10px] text-slate-400">Digital Health Card</p>
                      </div>
                    </Link>

                    <Link
                      href="/doctors"
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-900/90 transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">Doctor Directory</h4>
                        <p className="text-[10px] text-slate-400">Book Consultations</p>
                      </div>
                    </Link>

                    <Link
                      href="/appointments"
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-900/90 transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-300">Appointments</h4>
                        <p className="text-[10px] text-slate-400">Queue & Video Room</p>
                      </div>
                    </Link>
                  </div>

                  {/* Column 2: Digital Services */}
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400 border-b border-slate-800 pb-1">
                      AI & Pharmacy
                    </p>
                    <Link
                      href="/ai-assistant"
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-900/90 transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-purple-300">AI Triage Suite</h4>
                        <p className="text-[10px] text-slate-400">Symptom Advice</p>
                      </div>
                    </Link>

                    <Link
                      href="/pharmacy"
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-900/90 transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-emerald-300">Online Pharmacy</h4>
                        <p className="text-[10px] text-slate-400">2-Hour Delivery</p>
                      </div>
                    </Link>

                    <Link
                      href="/labs"
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-900/90 transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                        <TestTube className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-300">Diagnostic Labs</h4>
                        <p className="text-[10px] text-slate-400">Home Collection</p>
                      </div>
                    </Link>
                  </div>

                  {/* Column 3: Operations & Compare */}
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 border-b border-slate-800 pb-1">
                      Enterprise Ops
                    </p>
                    <Link
                      href="/compare"
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-900/90 transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                        <GitCompare className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-blue-300">Compare Matrix</h4>
                        <p className="text-[10px] text-slate-400">Side-by-Side Analytics</p>
                      </div>
                    </Link>

                    <Link
                      href="/hospital/dashboard"
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-900/90 transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-sky-300">Hospital Hub</h4>
                        <p className="text-[10px] text-slate-400">ICU & Blood Stock</p>
                      </div>
                    </Link>

                    {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
                      <Link
                        href="/admin"
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-emerald-950/40 transition-all border border-emerald-500/30"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-emerald-300">Admin Portal</h4>
                          <p className="text-[10px] text-emerald-400/80">RBAC Controls</p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
            </div>
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Emergency SOS High Priority Pill */}
            <Link
              href="/emergency"
              className="px-3 py-1.5 rounded-xl bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/60 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/20 animate-pulse transition-all"
            >
              <Siren className="w-4 h-4 text-red-400 fill-red-400/30" />
              <span>SOS Dispatch</span>
            </Link>

            {/* Quick Favorites & History */}
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <Link
                href="/favorites"
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive('/favorites') ? 'bg-sky-600/20 text-red-400' : 'text-slate-400 hover:text-red-400'
                }`}
                title="Favorites"
              >
                <Heart className="w-4 h-4" />
              </Link>

              <Link
                href="/history"
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive('/history') ? 'bg-sky-600/20 text-sky-400' : 'text-slate-400 hover:text-sky-400'
                }`}
                title="History"
              >
                <History className="w-4 h-4" />
              </Link>
            </div>

            {/* Role Switcher */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-2 py-1 flex items-center gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Role:</span>
              <select
                value={role}
                onChange={(e) => loginAs(e.target.value as UserRole)}
                className="bg-slate-950 text-xs text-sky-300 font-extrabold py-0.5 px-1.5 rounded-lg border border-slate-700/80 focus:outline-none cursor-pointer"
                suppressHydrationWarning
              >
                <option value="GUEST">Guest</option>
                <option value="USER">Patient</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>

            {user ? (
              <button
                onClick={logout}
                className="p-1.5 rounded-xl bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                title="Logout"
                suppressHydrationWarning
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => loginAs('USER')}
                className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg shadow-sky-600/20 transition-all flex items-center gap-1"
                suppressHydrationWarning
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/emergency"
              className="px-2.5 py-1.5 rounded-xl bg-red-600 text-white text-xs font-extrabold flex items-center gap-1"
            >
              <Siren className="w-4 h-4" />
              <span>SOS</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
              suppressHydrationWarning
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <Link
            href="/emergency"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold bg-red-950/80 text-red-300 border border-red-800"
          >
            <Siren className="w-4 h-4 text-red-400" />
            1-Tap Emergency SOS
          </Link>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-900"
          >
            <Building2 className="w-4 h-4 text-sky-400" /> Discover Hospitals
          </Link>

          <Link
            href="/patient/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-900"
          >
            <User className="w-4 h-4 text-sky-400" /> Patient Dashboard & Health Card
          </Link>

          <Link
            href="/doctors"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-900"
          >
            <UserCheck className="w-4 h-4 text-cyan-400" /> Doctors & Consultations
          </Link>

          <Link
            href="/appointments"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-900"
          >
            <Calendar className="w-4 h-4 text-emerald-400" /> Appointments & Queue
          </Link>

          <Link
            href="/ai-assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-purple-300 hover:bg-slate-900"
          >
            <Bot className="w-4 h-4 text-purple-400" /> AI Symptom Triage
          </Link>

          <Link
            href="/pharmacy"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-900"
          >
            <Pill className="w-4 h-4 text-emerald-400" /> Online Pharmacy
          </Link>

          <Link
            href="/labs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-900"
          >
            <TestTube className="w-4 h-4 text-amber-400" /> Diagnostic Labs
          </Link>

          <Link
            href="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-900"
          >
            <GitCompare className="w-4 h-4 text-blue-400" /> Hospital Comparison
          </Link>

          <Link
            href="/hospital/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-900"
          >
            <Building2 className="w-4 h-4 text-sky-400" /> Hospital Operations Hub
          </Link>
        </div>
      )}
    </header>
  );
}
