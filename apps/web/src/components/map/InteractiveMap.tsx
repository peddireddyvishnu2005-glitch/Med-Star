'use client';

import React from 'react';
import DynamicMap from './DynamicMap';
import { Hospital } from '@/types';

interface InteractiveMapProps {
  hospitals?: Hospital[];
  userLocation?: { lat: number; lng: number } | null;
  selectedHospital?: Hospital | null;
  routeGeometry?: [number, number][] | null;
  onSelectHospital?: (hosp: Hospital) => void;
  onNavigate?: (hosp: Hospital) => void;
}

export default function InteractiveMap({
  hospitals = [],
  userLocation = null,
  selectedHospital = null,
  routeGeometry = null,
  onSelectHospital = () => {},
  onNavigate = () => {},
}: InteractiveMapProps) {
  return (
    <DynamicMap
      hospitals={hospitals}
      userLocation={userLocation}
      selectedHospital={selectedHospital}
      routeGeometry={routeGeometry}
      onSelectHospital={onSelectHospital}
      onNavigate={onNavigate}
    />
  );
}
