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

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, loginAs, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent">
                MedStart
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Enterprise JS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/') ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Discover Hospitals
            </Link>

            <Link
              href="/navigation"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/navigation') ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Live Map & Routing
            </Link>

            <Link
              href="/favorites"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/favorites') ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Heart className="w-4 h-4 text-red-400" />
              Favorites
            </Link>

            <Link
              href="/history"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/history') ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <History className="w-4 h-4" />
              Navigation History
            </Link>

            {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
              <Link
                href="/admin"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/admin') ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'text-emerald-400 hover:bg-emerald-950/30'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Role Switcher & Auth Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-semibold uppercase">Role:</span>
              <select
                value={role}
                onChange={(e) => loginAs(e.target.value)}
                className="bg-slate-950 text-xs text-sky-300 font-bold py-1 px-2 rounded border border-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="GUEST">Guest</option>
                <option value="USER">User (Patient)</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-200">{user.displayName}</p>
                  <p className="text-[10px] text-sky-400">{user.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginAs('USER')}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-lg shadow-sky-600/20 transition-all flex items-center gap-1.5"
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
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
          >
            Discover Hospitals
          </Link>
          <Link
            href="/navigation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
          >
            Live Map & Routing
          </Link>
          <Link
            href="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
          >
            Favorites
          </Link>
          <Link
            href="/history"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
          >
            Navigation History
          </Link>
          {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-emerald-400 hover:bg-emerald-950/30"
            >
              Admin Dashboard
            </Link>
          )}

          <div className="pt-3 border-t border-slate-800">
            <p className="text-xs text-slate-400 mb-2">Switch Active Role:</p>
            <div className="flex flex-wrap gap-2">
              {['GUEST', 'USER', 'ADMIN', 'SUPER_ADMIN'].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    loginAs(r);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-xs rounded-md font-medium border ${
                    role === r ? 'bg-sky-600 text-white border-sky-500' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
