# Database Specification & Firestore Data Model — MedStart

## 1. Overview
Cloud Firestore is utilized as the primary enterprise document database.

## 2. Collections & Document Schemas

### 2.1 `hospitals` Collection
```json
{
  "id": "hosp_101",
  "name": "City Central General Hospital",
  "slug": "city-central-general",
  "address": "124 Healthcare Boulevard",
  "city": "Metropolis",
  "state": "NY",
  "zip": "10001",
  "phone": "+1-555-0192",
  "emergencyPhone": "+1-555-9111",
  "hasEmergency": true,
  "availableEmergencyBeds": 14,
  "totalEmergencyBeds": 20,
  "lat": 40.7128,
  "lng": -74.0060,
  "rating": 4.8,
  "reviewCount": 124,
  "images": ["https://storage.googleapis.com/medstart/hosp1.jpg"],
  "departments": ["Cardiology", "Emergency", "Pediatrics", "Orthopedics"],
  "operatingHours": "24/7",
  "status": "ACTIVE",
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-07-23T00:00:00Z"
}
```

### 2.2 `doctors` Collection
```json
{
  "id": "doc_201",
  "hospitalId": "hosp_101",
  "name": "Dr. Sarah Jenkins",
  "specialty": "Cardiology",
  "department": "Cardiology",
  "experienceYears": 14,
  "phone": "+1-555-0198",
  "email": "s.jenkins@cityhospital.org",
  "availableDays": ["Mon", "Wed", "Fri"],
  "avatarUrl": "https://storage.googleapis.com/medstart/doc1.jpg",
  "status": "ACTIVE"
}
```

### 2.3 `users` Collection
```json
{
  "uid": "user_abc123",
  "email": "patient@example.com",
  "displayName": "John Doe",
  "role": "USER",
  "phone": "+1-555-0100",
  "favorites": ["hosp_101"],
  "createdAt": "2026-05-10T12:00:00Z"
}
```

### 2.4 `routeHistory` Subcollection (`users/{uid}/routeHistory`)
```json
{
  "id": "route_991",
  "hospitalId": "hosp_101",
  "hospitalName": "City Central General Hospital",
  "startLat": 40.7306,
  "startLng": -73.9352,
  "destLat": 40.7128,
  "destLng": -74.0060,
  "distanceKm": 4.2,
  "durationMins": 12,
  "timestamp": "2026-07-23T14:30:00Z"
}
```
