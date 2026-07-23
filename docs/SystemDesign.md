# System Design Document — MedStart

## 1. System Overview & Scalability Architecture
MedStart system design guarantees low latency under peak load (e.g. regional health crises or sudden spikes in emergency hospital searches).

## 2. Component Design

### 2.1 Search & Geo-spatial Query Strategy
- Hospitals are indexed in Firestore with Latitude and Longitude fields.
- Client-side and server-side Haversine formula calculation determines radial distance.
- Geo-indexing allows sub-50ms radial queries for nearby emergency facilities.

### 2.2 Navigation Engine Design
- Integrated turn-by-turn route calculations via OpenRouteService API.
- Fallback route generation uses direct polyline interpolation and distance estimation if API limits or offline scenarios occur.
- Offline navigation relies on pre-cached route geometry stored in IndexedDB.

### 2.3 Caching & Edge Distribution
- **Static Assets**: Edge CDN delivery via Vercel Edge Network with `stale-while-revalidate` caching headers.
- **Hospital Directory Data**: Redis/In-memory cache option on NestJS backend with 5-minute TTL for hospital search listings.
- **Client Cache**: TanStack Query caches hospital search results and doctor rosters with stale time of 60 seconds.
