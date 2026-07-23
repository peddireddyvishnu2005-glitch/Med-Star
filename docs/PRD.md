# Product Requirements Document (PRD) — MedStart

## 1. Executive Summary
MedStart is an enterprise-grade Hospital Finder & Turn-by-Turn Navigation Platform engineered to bridge the gap between patient emergency needs and healthcare provider accessibility. Combining real-time GPS location tracking, instant routing (fastest/shortest paths), emergency bed/ICU availability, specialized medical department search, and multi-tier Role-Based Access Control (RBAC), MedStart delivers high-availability hospital discovery across Web, Mobile, and Tablet devices.

## 2. Product Vision
To be the global benchmark for digital healthcare navigation and emergency discovery by empowering patients with instantaneous, life-saving route guidance and transparent hospital capabilities.

## 3. Mission Statement
Provide a resilient, accessible (WCAG 2.2 AA), offline-capable Progressive Web Application (PWA) that connects users with nearby verified hospitals, emergency services, and medical specialists in under three taps.

## 4. Business Goals
- **Emergency Speed to Care**: Reduce average time-to-hospital search during emergencies by 65%.
- **Platform Reliability**: Maintain 99.99% uptime with offline PWA caching for route caching and offline contact info.
- **Provider Engagement**: Enable hospitals to manage their own real-time department status, doctor rosters, and emergency bed counts via an intuitive Admin Portal.

## 5. Problem Statement
Patients facing medical emergencies or seeking specialist consultation struggle with fragmented information across search engines, out-of-date emergency room availability, inaccurate map markers, and poor offline access during low-connectivity scenarios.

## 6. Target Audience & User Personas

### Persona A: Emergency Care Seeker (Patient/Family)
- **Age**: 25 – 65
- **Goal**: Find nearest hospital with active emergency/ICU beds and get turn-by-turn navigation immediately.
- **Pain Points**: Panic under stress, slow web pages, missing contact numbers, unclear route guidance.

### Persona B: Outpatient / Specialty Seeker
- **Age**: 18 – 75
- **Goal**: Search for specific medical departments (Cardiology, Pediatrics, Oncology) and book/view doctor rosters.
- **Pain Points**: Outdated doctor schedules, lack of hospital ratings/reviews filter.

### Persona C: Hospital Operations Manager (Admin)
- **Age**: 30 – 55
- **Goal**: Update emergency status, edit department rosters, view platform analytics, and manage notifications.
- **Pain Points**: Clunky admin software, lack of audit logging, complex user management.

## 7. Competitor Analysis

| Feature | Google Maps | Practo / Zocdoc | MedStart Enterprise |
| :--- | :--- | :--- | :--- |
| **Turn-by-Turn Navigation** | Native | External Link | Integrated OpenRouteService & Leaflet |
| **Real-time Emergency Status** | Basic / Community | No | Verified Live Emergency & Bed Tracking |
| **Offline Route & Info Access** | Downloaded maps | No | PWA IndexedDB & Service Worker Cache |
| **RBAC Multi-Tier Admin** | No | Basic Provider | Super Admin, Hospital Admin, Staff, User |
| **WCAG 2.2 AA Accessibility** | Partial | Partial | Full 100% Screen Reader & Keyboard Nav |

## 8. Functional Requirements

### FR-1: Hospital Discovery & Search
- Search by hospital name, city, specialty, department, or zip code.
- Filter by distance (1km, 5km, 10km, 25km+), 24/7 Emergency availability, ICU availability, rating (1-5 stars), and insurance compatibility.

### FR-2: Location & Turn-by-Turn Navigation
- HTML5 Geolocation API with manual pin drop fallback.
- OSRM / OpenRouteService calculation for Fastest vs. Shortest routes.
- Step-by-step turn guidance with maneuver icons and voice instruction capability.

### FR-3: Hospital Profiles & Reviews
- Detailed view containing address, phone, emergency hotline, departments list, doctor roster, photo gallery, operating hours, and user reviews.
- Authenticated users can post ratings and reviews with moderation guards.

### FR-4: User Dashboard & History
- Save favorite hospitals.
- Store navigation history locally and sync to Firebase Firestore for authenticated users.

### FR-5: Admin Management Portal
- CRUD for Hospitals, Departments, Doctors, and Users.
- Broadcast FCM Push Notifications for regional health alerts or emergency notices.
- Audit logs capturing every administrative modification.

## 9. Non-Functional Requirements (NFR)
- **Performance**: Lighthouse Performance score ≥ 95; First Contentful Paint (FCP) < 1.0s.
- **Accessibility**: 100% WCAG 2.2 AA compliance; fully screen-reader accessible.
- **SEO & Best Practices**: Lighthouse 100 on SEO and Best Practices.
- **Security**: AES-256 encrypted storage, HTTPS TLS 1.3, Firebase App Check protection, Firestore Security Rules.
- **Offline Support**: Full PWA Service Worker caching for shell, map tiles, and offline search fallback.

## 10. Success Metrics & KPIs
- **Avg Search Latency**: < 150ms
- **Route Calculation Speed**: < 400ms
- **App Crash Rate**: < 0.01%
- **Lighthouse Scores**: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO.
