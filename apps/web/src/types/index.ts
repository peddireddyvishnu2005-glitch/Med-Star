export type UserRole = 'GUEST' | 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  favorites: string[]; // hospital IDs
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  headDoctor?: string;
}

export interface Doctor {
  id: string;
  hospitalId: string;
  name: string;
  specialty: string;
  department: string;
  experienceYears: number;
  phone: string;
  email: string;
  availableDays: string[];
  avatarUrl: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface HospitalReview {
  id: string;
  hospitalId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  emergencyPhone: string;
  hasEmergency: boolean;
  availableEmergencyBeds: number;
  totalEmergencyBeds: number;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  images: string[];
  departments: string[];
  operatingHours: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  distanceKm?: number;
}

export interface NavigationStep {
  instruction: string;
  distance: string;
  duration: string;
  icon: 'straight' | 'turn-left' | 'turn-right' | 'destination' | 'uturn';
}

export interface RouteInfo {
  distanceKm: number;
  durationMins: number;
  geometry: [number, number][]; // [lat, lng] array for Leaflet polyline
  steps: NavigationStep[];
}

export interface RouteHistoryItem {
  id: string;
  hospitalId: string;
  hospitalName: string;
  startLat: number;
  startLng: number;
  destLat: number;
  destLng: number;
  distanceKm: number;
  durationMins: number;
  timestamp: string;
}

export interface SystemAuditLog {
  id: string;
  action: string;
  performedBy: string;
  targetId: string;
  details: string;
  timestamp: string;
}
