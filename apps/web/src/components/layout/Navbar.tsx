'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Building2, 
  MapPin, 
  Heart, 
  History, 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  Menu, 
  X 
} from 'lucide-react';
import { UserRole } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, loginAs, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent tracking-tight">
                MedStart
              </span>
              <span className="hidden xl:inline-block text-[9px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                ENTERPRISE
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-1.5">
            <Link
              href="/"
              className={`px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/') 
                  ? 'bg-sky-600/20 text-sky-400 border border-sky-500/40 shadow-sm shadow-sky-500/10' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <Building2 className="w-4 h-4 text-sky-400" />
              Discover
            </Link>

            <Link
              href="/navigation"
              className={`px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/navigation') 
                  ? 'bg-sky-600/20 text-sky-400 border border-sky-500/40 shadow-sm shadow-sky-500/10' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <MapPin className="w-4 h-4 text-sky-400" />
              Live Map & Routing
            </Link>

            <Link
              href="/favorites"
              className={`px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/favorites') 
                  ? 'bg-sky-600/20 text-sky-400 border border-sky-500/40 shadow-sm shadow-sky-500/10' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <Heart className="w-4 h-4 text-red-400" />
              Favorites
            </Link>

            <Link
              href="/history"
              className={`px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/history') 
                  ? 'bg-sky-600/20 text-sky-400 border border-sky-500/40 shadow-sm shadow-sky-500/10' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <History className="w-4 h-4 text-sky-400" />
              History
            </Link>

            {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
              <Link
                href="/admin"
                className={`px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive('/admin') 
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/10' 
                    : 'text-emerald-400 hover:bg-emerald-950/30'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Admin Portal
              </Link>
            )}
          </nav>

          {/* User & Role Controls */}
          <div className="hidden lg:flex items-center gap-2.5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-2.5 py-1 flex items-center gap-1.5 backdrop-blur-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Role:</span>
              <select
                value={role}
                onChange={(e) => loginAs(e.target.value as UserRole)}
                className="bg-slate-950 text-xs text-sky-300 font-extrabold py-0.5 px-2 rounded-lg border border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="GUEST">Guest</option>
                <option value="USER">Patient</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>

            {user ? (
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1 pl-3 rounded-xl backdrop-blur-md">
                <div className="text-right leading-tight">
                  <p className="text-xs font-bold text-slate-100">{user.displayName}</p>
                  <p className="text-[10px] font-semibold text-sky-400">{user.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg bg-slate-950 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginAs('USER')}
                className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg shadow-sky-600/20 transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive('/') ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' : 'text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-400" />
            Discover Hospitals
          </Link>
          <Link
            href="/navigation"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive('/navigation') ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' : 'text-slate-200 hover:bg-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4 text-sky-400" />
            Live Map & Routing
          </Link>
          <Link
            href="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive('/favorites') ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' : 'text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 text-red-400" />
            Favorites
          </Link>
          <Link
            href="/history"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive('/history') ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' : 'text-slate-200 hover:bg-slate-900'
            }`}
          >
            <History className="w-4 h-4 text-sky-400" />
            Navigation History
          </Link>
          {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive('/admin') ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'text-emerald-400 hover:bg-emerald-950/30'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Admin Dashboard
            </Link>
          )}

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <p className="text-xs font-semibold text-slate-400">Switch Active Role:</p>
            <div className="grid grid-cols-2 gap-2">
              {(['GUEST', 'USER', 'ADMIN', 'SUPER_ADMIN'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    loginAs(r);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-xs rounded-xl font-bold border transition-all ${
                    role === r ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-600/20' : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {r === 'SUPER_ADMIN' ? 'Super Admin' : r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
