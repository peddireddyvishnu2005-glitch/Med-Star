import { NavigationStep, RouteInfo } from '@/types';

/**
 * Haversine formula to calculate radial distance between two GPS coordinates in kilometers.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
}

/**
 * Generate simulated turn-by-turn route geometry and instruction steps for navigation demo.
 */
export function generateRouteGeometry(
  startLat: number,
  startLng: number,
  destLat: number,
  destLng: number
): RouteInfo {
  const distance = calculateHaversineDistance(startLat, startLng, destLat, destLng);
  // Estimate driving time assuming average urban speed of 35 km/h
  const durationMins = Math.max(3, Math.round((distance / 35) * 60));

  // Generate intermediate polyline waypoints between start and destination
  const stepsCount = 6;
  const geometry: [number, number][] = [];

  for (let i = 0; i <= stepsCount; i++) {
    const ratio = i / stepsCount;
    // Add subtle curvature jitter for realistic map polylines
    const jitterLat = i > 0 && i < stepsCount ? (Math.sin(i) * 0.003) : 0;
    const jitterLng = i > 0 && i < stepsCount ? (Math.cos(i) * 0.003) : 0;
    
    const waypointLat = startLat + (destLat - startLat) * ratio + jitterLat;
    const waypointLng = startLng + (destLng - startLng) * ratio + jitterLng;
    geometry.push([waypointLat, waypointLng]);
  }

  const steps: NavigationStep[] = [
    {
      instruction: 'Head North towards the main boulevard',
      distance: `${Math.round(distance * 0.15 * 1000)} m`,
      duration: '2 mins',
      icon: 'straight'
    },
    {
      instruction: 'Turn right onto Healthcare Avenue',
      distance: `${Math.round(distance * 0.35 * 1000)} m`,
      duration: '4 mins',
      icon: 'turn-right'
    },
    {
      instruction: 'Merge left at the central medical interchange',
      distance: `${Math.round(distance * 0.3 * 1000)} m`,
      duration: '3 mins',
      icon: 'turn-left'
    },
    {
      instruction: 'Arrive at Emergency Bay Entrance on your left',
      distance: `${Math.round(distance * 0.2 * 1000)} m`,
      duration: '2 mins',
      icon: 'destination'
    }
  ];

  return {
    distanceKm: distance,
    durationMins,
    geometry,
    steps
  };
}
