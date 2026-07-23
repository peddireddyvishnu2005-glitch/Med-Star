'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  loginAs: (role: UserRole, email?: string) => void;
  logout: () => void;
  toggleFavorite: (hospitalId: string) => void;
  isFavorite: (hospitalId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medstart_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const role: UserRole = user?.role || 'GUEST';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('medstart_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('medstart_user');
      }
    }
  }, [user]);

  const loginAs = (targetRole: UserRole, emailInput?: string) => {
    const newUser: UserProfile = {
      uid: `usr-${Date.now()}`,
      email: emailInput || (targetRole === 'ADMIN' ? 'admin@medstart.org' : targetRole === 'SUPER_ADMIN' ? 'superadmin@medstart.org' : 'patient@example.com'),
      displayName: targetRole === 'ADMIN' ? 'Dr. Sarah Lawson (Admin)' : targetRole === 'SUPER_ADMIN' ? 'System Administrator' : 'John Doe (Patient)',
      role: targetRole,
      phone: '+1 (555) 019-2831',
      favorites: ['hosp-101'],
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (hospitalId: string) => {
    if (!user) {
      // Auto sign-in as registered user if guest clicks favorite
      loginAs('USER');
      return;
    }
    const exists = user.favorites.includes(hospitalId);
    const updatedFavorites = exists
      ? user.favorites.filter(id => id !== hospitalId)
      : [...user.favorites, hospitalId];

    setUser({
      ...user,
      favorites: updatedFavorites
    });
  };

  const isFavorite = (hospitalId: string): boolean => {
    return user?.favorites.includes(hospitalId) || false;
  };

  return (
    <AuthContext.Provider value={{ user, role, loginAs, logout, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
